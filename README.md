# ScolioVis

This is a compiled package of our undergraduate research for West Visayas State University - College of Information and Communications Technology entitled: "ScolioVis
Automated Cobb Angle Measurement on Anterior-Posterior Spine X-Rays using Multi-Instance Keypoint Detection with Keypoint RCNN"

### About

ScolioVis is a tool for automatically measuring the Cobb Angle—the standard measurement to assess Scoliosis. We harness the power of computer vision and machine learning to extract the cobb angles of an anterior-posterior Spine x-ray image. We built this application from the ground-up to an actual implementation in a usable web app.

We trained a Keypoint RCNN model on the [SpineWeb Dataset 16](http://spineweb.digitalimaginggroup.ca/Index.php?n=Main.Datasets#Dataset_16.3A_609_spinal_anterior-posterior_x-ray_images). Boasting a performance of 93% AP at IoU=0.50 on object detections and 57% AP at IoU=0.50 on keypoint detections. The dataset is also part of the [Accurate Automated Spinal Curvature Estimation (AASCE) 2019 Grand Challenge](https://aasce19.grand-challenge.org/Task/). We're not competing but according to the performance metric of the challenge, we have achieved an SMAPE of \_\_ in cobb angle calculation.
on

### Repositories

1. `🔏` [scoliovis-web](https://github.com/Blankeos/scoliovis-web) - Front End Repo
2. `⚡` [scoliovis-api](https://github.com/Blankeos/scoliovis-api) - Back End Repo
3. `⛹️‍♂️` [scoliovis-training](https://github.com/Blankeos/scoliovis-training) - Training Repository

### Colab Notebooks

1. [Dataset Preprocessing for Keypoint RCNN](https://colab.research.google.com/drive/1Rlt43PWo6NYREuDsGT8K5tRg5QqfFdVc?usp=sharing)
1. [Keypoint RCNN Training](https://colab.research.google.com/drive/1aaTWt2rZ-M7YlqIus7aC-84SorjNwl8G?usp=sharing)
1. [Cobb Angle Calculation](https://colab.research.google.com/drive/1Cm32oftsMpsqMH5kLHgr0RtsfLAfiJnF?usp=sharing)

### Models

1. release/yolov5-detection.pt
2. release/keypointsrcnn-weights.pt

### References

> Wu, H., Bailey, Chris., Rasoulinejad, Parham., and Li, S., 2017.Automatic landmark estimation for adolescent idiopathic scoliosis assessment using boostnet. Medical Image Computing and Computer Assisted Intervention:127-135.

<br/>
<br/>

2022 © Taleon, Elizalde, Rubinos (BSCS4A) - West Visayas State University - College of Information and Communications Technology. All Rights Reserved.
