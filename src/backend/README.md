# 🦴⚡ scoliovis-api

![demo](https://github.com/seajayrubynose/cafely-pictures/blob/master/_scoliovis/demo.gif?raw=true)

This repository contains the backend api for our undergraduate thesis project entitled: **_"ScolioVis: Automated Cobb Angle Measurement on Anterior-Posterior Spine X-Rays using Multi-Instance Keypoint Detection with Keypoint RCNN"_**.

A live demo is available on [https://scoliovis.app](https://scoliovis.app)

For more information on the whole project go to [blankeos/scoliovis](https://github.com/Blankeos/scoliovis).

### Built with

- Python
- FastAPI
- OpenCV
- PyTorch

### Installation

1. Clone repo

   ```sh
   > git clone https://github.com/blankeos/scoliovis-api.git
   > cd scoliovis-api
   ```

2. Create a virtual environment

   ```sh
   > python -m venv venv
   ```

3. Activate virtual environment
   ```sh
   > venv\Scripts\activate # windows
   > source venv/Scripts/activate # bash/mac
   ```
4. Install dependencies

   ```sh
   > pip install -r requirements.txt
   ```

5. Download the model keypointsrcnn_weights.pt and put inside /models

   - Download here: [scoliovis-training/releases/keypointsrcnn_weights.pt](https://github.com/Blankeos/scoliovis-training/releases/download/latest/keypointsrcnn_weights.pt)

6. Run the server
   ```sh
   > uvicorn main:app
   ```
