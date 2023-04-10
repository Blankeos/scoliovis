import torch
import torchvision
from torchvision.transforms import functional as F
import numpy as np
from scoliovis.get_model import get_kprcnn_model

# DOWNLOAD THE MODEL (but don't cache)
get_kprcnn_model()

def _filter_output(output):
  # 1. Get Scores
  scores = output['scores'].detach().cpu().numpy()

  # 2. Get Indices of Scores over Threshold
  high_scores_idxs = np.where(scores > 0.5)[0].tolist() # Indexes of boxes with scores > 0.5

  # 3. Get Indices after Non-max Suppression
  post_nms_idxs = torchvision.ops.nms(output['boxes'][high_scores_idxs], output['scores'][high_scores_idxs], 0.3).cpu().numpy() # Indexes of boxes left after applying NMS (iou_threshold=0.3)

  # 4. Get final `bboxes` and `keypoints` and `scores` based on indices
  np_keypoints = output['keypoints'][high_scores_idxs][post_nms_idxs].detach().cpu().numpy()
  np_bboxes = output['boxes'][high_scores_idxs][post_nms_idxs].detach().cpu().numpy()
  np_scores = output['scores'][high_scores_idxs][post_nms_idxs].detach().cpu().numpy()

  # 5. Get the Top 17 Scores
  sorted_scores_idxs = np.argsort(-1*np_scores) # descending

  np_scores = scores[sorted_scores_idxs][:18]
  np_keypoints = np.array([np_keypoints[idx] for idx in sorted_scores_idxs])[:18]
  np_bboxes = np.array([np_bboxes[idx] for idx in sorted_scores_idxs])[:18]

  # 6. Sort by ymin
  # kp[0] is the first point in [p1,p2,p3,p4]
  # kp[0][1] is the y1 in p1=[x1,y1,x2,y2]  
  ymins = np.array([kps[0][1] for kps in np_keypoints])

  sorted_ymin_idxs = np.argsort(ymins) # ascending
  
  np_scores = np.array([np_scores[idx] for idx in sorted_ymin_idxs])
  np_keypoints = np.array([np_keypoints[idx] for idx in sorted_ymin_idxs])
  np_bboxes = np.array([np_bboxes[idx] for idx in sorted_ymin_idxs])
  
  # 7. Convert everything to List Instead of Numpy
  keypoints_list = []
  for kps in np_keypoints:
      keypoints_list.append([list(map(float, kp[:2])) for kp in kps])

  bboxes_list = []
  for bbox in np_bboxes:
      bboxes_list.append(list(map(int, bbox.tolist())))
    
  scores_list = np_scores.tolist()

  return bboxes_list, keypoints_list, scores_list

def predict(images):
  """
  images:
    > List of Tensors, shape=[C, W, H]. Values 0-1. | 
    > Numpy array of image |
    > String path to image |
    > List of String paths to images

    returns (bboxes, keypoints, scores)[] of n=17
  """
  device = torch.device('cpu')
  model = get_kprcnn_model()
  model.to(device)
  model.eval()

  # 1. Process `images`
  images_input = [F.to_tensor(images)]

  images_input = [image.to(device) for image in images_input]

  # 2. Inference
  with torch.no_grad():
    outputs = model(images_input) # 3. get output

  filtered_outputs = [_filter_output(output) for output in outputs]
  return filtered_outputs

from scoliovis.cobb_angle_cal import cobb_angle_cal, keypoints_to_landmark_xy

def kprcnn_to_scoliovis_api_format(bboxes, keypoints, scores, image_shape):
  """
  @params
  - `bboxes, keypoints, scores` - outputs from the model
  - `image_shape` - (HEIGHT, WIDTH, CHANNELS)
  @returns {
    `detections`: { 
      `class`: number, 
      `confidence`: number, 
      `name`: "vert", 
      `xmax`: number, 
      `xmin`: number, 
      `ymin`: number, 
      `ymax`: number 
    },
    `normalized_detections`: **REMOVED**,
    `landmarks`: [x,y,x,y,x,y,x,y,x,y,x,y],
    `angles`: {
      `pt`: {
        `angle`: number,
        `idxs`: [number, number]
      },
      `mt`: {
        `angle`: number,
        `idxs`: [number, number]
      },
      `tl`: {
        `angle`: number,
        `idxs`: [number, number]
      }
    },
    `midpoint_lines`: [
      [[x,y],[x,y]],
      [[x,y],[x,y]],
      [[x,y],[x,y]]
    ],
    `curve_type`: "S" | "C"
  }
  """

  detections = []
  for idx, bbox in enumerate(bboxes):
    detections.append({
        "class": 0,
        "confidence": scores[idx],
        "name": "vert",
        "xmin": bbox[0],
        "ymin": bbox[1],
        "xmax": bbox[2],
        "ymax": bbox[3],
    })

  landmarks = []
  for kps in keypoints:
    for kp in kps:
      landmarks.append(kp[0])
      landmarks.append(kp[1])
  
  try:
    _, angles, curve_type, midpoint_lines = cobb_angle_cal(keypoints_to_landmark_xy(keypoints), image_shape)
  except:
    curve_type = None
    angles = None
    midpoint_lines = None

    print("Could not calculate Cobb Angle for this Image")
    
  return {
      "detections": detections,
      "landmarks": landmarks,
      "angles": angles,
      "curve_type": curve_type,
      "midpoint_lines": midpoint_lines,
  }