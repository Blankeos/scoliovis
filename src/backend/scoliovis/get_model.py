import os
from pathlib import Path

# Keypoint RCNN Model
import torch
from torchvision.models.detection.rpn import AnchorGenerator
import torchvision

def _download_kprcnn_model():
    print("DETA: Downloading Keypoint RCNN Model...")
    from deta import Deta
    deta = Deta(os.environ.get("DETA_ID"))
    models = deta.Drive("models")
    model_file = models.get('keypointsrcnn_weights.pt')
    with open("models/keypointsrcnn_weights.pt", "wb+") as f:
        for chunk in model_file.iter_chunks(1024):
            f.write(chunk)
        print("DETA: Keypoint RCNN model downloaded.")
        model_file.close()


def get_kprcnn_model():
    model_folder = Path("models")
    if not model_folder.exists():
        os.mkdir("models")
    model_path = Path("models/keypointsrcnn_weights.pt")
    
    # Download if the model does not exist
    if model_path.is_file():
        print("Keypoint RCNN Model is already downloaded.")
    else:
        print("Keypoint RCNN Model was NOT FOUND.")
        _download_kprcnn_model()

    num_keypoints = 4
    anchor_generator = AnchorGenerator(sizes=(32, 64, 128, 256, 512), aspect_ratios=(0.25, 0.5, 0.75, 1.0, 2.0, 3.0, 4.0))
    model = torchvision.models.detection.keypointrcnn_resnet50_fpn(pretrained=False,
                                                                   pretrained_backbone=True,
                                                                   num_keypoints=num_keypoints,
                                                                   num_classes = 2, # Background is the first class, object is the second class
                                                                   rpn_anchor_generator=anchor_generator)
    if model_path:
        state_dict = torch.load(model_path, map_location=torch.device('cpu'))
        model.load_state_dict(state_dict)        
        
    return model

# YoloV5 Model
# def _download_detection_model():
#     print("DETA: Downloading Object Detection Model...")
#     from deta import Deta
#     deta = Deta(os.environ.get("DETA_ID"))
#     models = deta.Drive("models")
#     model_file = models.get('detection_model.pt')
#     with open("models/detection_model.pt", "wb+") as f:
#         for chunk in model_file.iter_chunks(1024):
#             f.write(chunk)
#         print("DETA: Object Detection model downloaded.")
#         model_file.close()

# def get_detection_model():
#     model_folder = Path("models")
#     if not model_folder.exists():
#         os.mkdir("models")
#     model_path = Path("models/detection_model.pt")

#     # Download if the model does not exist
#     if model_path.is_file():
#         print("Detection Model is already downloaded.")
#     else:
#         print("Detection Model was NOT FOUND.")
#         _download_detection_model()
    
#     # Get model from path and return
#     model = torch.hub.load('./yolov5', 'custom', path='./models/detection_model.pt', source='local')
#     return model