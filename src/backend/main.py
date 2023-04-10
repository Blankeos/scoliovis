import dotenv
dotenv.load_dotenv()
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

# -- 1. Create FastAPI app --
app = FastAPI()

# -- 2. Enable CORS All Origin --
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# -- 3. Load models if not yet loaded --
# from scoliovis.get_model import get_detection_model # YoloV5
# detection_model = get_detection_model() # YoloV5
from scoliovis.kprcnn import predict, kprcnn_to_scoliovis_api_format # KPRCNN

# 4. -- Routes --
@app.get("/")
async def read_root():
    print("Read Root started")
    return {"Hello": "World", "Message": "Welcome to ScolioVis-API! Send a POST request these APIs to get started!",
    "ModelPredict": "/v2/getprediction"
    }

# Keypoint RCNN Model
from io import BytesIO
from PIL import Image
import cv2 as cv
import numpy as np

@app.post('/v2/getprediction')
async def get_prediction_v2(image: UploadFile):
    # - Preprocess 'Image'
    image = Image.open(BytesIO(await image.read())).convert('RGB') # Decode UploadFile -> PIL
    image = cv.cvtColor(np.array(image), cv.COLOR_RGB2BGR) # PIL RGB -> Mat(OpenCV) RGB -> BGR

    # - Keypoint RCNN Predict
    bboxes, keypoints, scores = predict(image)[0]
    api_object = kprcnn_to_scoliovis_api_format(bboxes, keypoints, scores, image.shape)
    return api_object

# YOLO V5
# import base64
# import pandas as pd
# import json

# def detect(imgs):
#   detection_model.conf = 0.50
#   results = detection_model(imgs, size=640) # batch of images
  
#   # Sort by confidence all and get top 17
#   results_df = [pred_df.sort_values('confidence', ascending = False).head(17) for pred_df in results.pandas().xyxy]
#   results_df_n = [pred_df.sort_values('confidence', ascending = False).head(17) for pred_df in results.pandas().xyxyn]

#   # Sort by min y so they're ordered from top to bottom
#   results_df = [pred_df.sort_values('ymin', ascending = True) for pred_df in results_df]
#   results_df_n = [pred_df.sort_values('ymin', ascending = True) for pred_df in results_df_n]

#   return results_df, results_df_n

# @app.post("/getprediction")
# async def get_prediction(image: UploadFile):
#     # - Preprocess 'image'
#     image = Image.open(BytesIO(await image.read())).convert('RGB') # Decode UploadFile -> PIL
#     image = cv.cvtColor(np.array(image), cv.COLOR_RGB2BGR) # PIL RGB -> Mat(OpenCV) RGB -> BGR

#     # - Object Detection
#     results_df, results_df_n = detect(image)
#     detections = json.loads(results_df[0].to_json(orient="records"))
#     detections_n = json.loads(results_df_n[0].to_json(orient="records"))

#     # - Create Base64 from Detection
#     jpeg_string = base64.b64encode(cv.imencode('.jpg', image)[1]).decode()

#     # - Landmark Detection
#     # df = pd.read_csv('data/C AP test landmarks.csv', header=None)
#     height, width = image.shape
#     landmarks = [0.43909,0.57581,0.44172,0.56968,0.43646,0.56617,0.43032,0.55653,0.42857,0.5539,0.42244,0.53812,0.41718,0.52498,0.40578,0.50482,0.38738,0.48904,0.34882,0.45223,0.33041,0.44172,0.28396,0.3979,0.28396,0.38826,0.25592,0.37511,0.25416,0.37248,0.25855,0.37862,0.26643,0.38563,0.28571,0.41455,0.30237,0.4312,0.34531,0.48203,0.37423,0.50394,0.4128,0.57055,0.43909,0.5837,0.47415,0.62138,0.47765,0.63453,0.52585,0.66959,0.52498,0.68098,0.52147,0.68449,0.52235,0.68536,0.51183,0.66258,0.48203,0.64417,0.42682,0.6021,0.38913,0.58808,0.38124,0.57493,0.071538,0.072303,0.091048,0.096787,0.10214,0.1075,0.12663,0.13007,0.13657,0.14614,0.15647,0.17024,0.17024,0.18592,0.20161,0.215,0.21385,0.22992,0.24981,0.26473,0.26358,0.27621,0.29763,0.31331,0.30987,0.32249,0.35004,0.35501,0.36266,0.36496,0.40742,0.39977,0.42043,0.41086,0.46174,0.4407,0.47666,0.45409,0.51836,0.48852,0.52946,0.5,0.56618,0.54093,0.58569,0.55394,0.61515,0.5899,0.62969,0.61132,0.66641,0.65302,0.68133,0.6733,0.71385,0.72073,0.728,0.73718,0.76243,0.77735,0.785,0.80796,0.83818,0.85845,0.86113,0.87643,0.90207,0.90551]
    
#     return {
#         "landmarks": landmarks,
#         "detections": detections,
#         "normalized_detections": detections_n,
#         "base64_image": jpeg_string,
#     }

# Useful Stackoverflow/GitHub Solutions:
# - Convert PIL -> Mat(OpenCV) & Vice Versa
# https://stackoverflow.com/questions/14134892/convert-image-from-pil-to-opencv-format

# - How to Receive Image -> Process with Cv2 -> Return Image in FastAPI
# https://stackoverflow.com/questions/61333907/receiving-an-image-with-fast-api-processing-it-with-cv2-then-returning-it

# - Receiving UploadFile -> PIL
# https://github.com/tiangolo/fastapi/discussions/4308

# Run the application with:
# uvicorn main:app --reload