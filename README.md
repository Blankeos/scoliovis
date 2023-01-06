![preview](/preview.png)

<h3 align="center">ScolioVis</h3>
<p align="center">
  Automated Cobb Angle Measurement on Anterior-Posterior Spine X-Rays using Multi-Instance Keypoint Detection with Keypoint RCNN
</p>
<p align="center">
  <a href="https://github.com/sindresorhus/awesome">
    <img alt="Awesome" src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg">
  </a>
  <a href="https://github.com/ossu/computer-science">
	<img alt="Open Source Society University - Computer Science" src="vercel_badge_custom.png">
  </a>
</p>

## Summary

This repository serves as the compiled package of our undergraduate research for West Visayas State University - College of Information and Communications Technology entitled: **_"ScolioVis:
Automated Cobb Angle Measurement on Anterior-Posterior Spine X-Rays using Multi-Instance Keypoint Detection with Keypoint RCNN"_**

In this repo, you can:

- [x] Read our research manuscript.
- [x] Understand our project.
- [x] Try our live, deployed demo on [scoliovis.app](https://scoliovis.app/)
- [x] Try running our project locally.
- [x] Recreate our research/project.

## Contents of this Repository

- [About](#about)
- [Repositories](#repositories)
- [Colab Notebooks](#colab-notebooks)
- [Models](#models)
- [Usage Instructions](#usage-instructions)
  - Run the project on your local machine.
  - Reproduce the project from scratch.
- [Important References](#important-references)

## About

ScolioVis is a tool for automatically measuring the Cobb Angle—the standard measurement to assess Scoliosis. We harness the power of computer vision and machine learning to extract the cobb angles of an anterior-posterior Spine x-ray image. We built this application from the ground-up to an actual implementation in a usable web app.

We trained a Keypoint RCNN model on the [SpineWeb Dataset 16](http://spineweb.digitalimaginggroup.ca/Index.php?n=Main.Datasets#Dataset_16.3A_609_spinal_anterior-posterior_x-ray_images). Boasting a performance of 93% AP at IoU=0.50 on object detections and 57% AP at IoU=0.50 on keypoint detections. The dataset is also part of the [Accurate Automated Spinal Curvature Estimation (AASCE) 2019 Grand Challenge](https://aasce19.grand-challenge.org/Task/). Atlhough we aren't competing, using the performance metric of the challenge, we have achieved an SMAPE of 8.97 in cobb angle calculation which means ScolioVis as a whole is able to predict cobb angles at 91.03% accuracy.

A live deployed version of the application is available at [scoliovis.app](https://scoliovis.app/).

## Source Repositories

1. `🔏` [scoliovis-web](https://github.com/Blankeos/scoliovis-web) - Front End Repo
2. `⚡` [scoliovis-api](https://github.com/Blankeos/scoliovis-api) - Back End Repo
3. `⛹️‍♂️` [scoliovis-training](https://github.com/Blankeos/scoliovis-training) - Model Training Repository

## Colab Notebooks

1. [Dataset Preprocessing for Keypoint RCNN](https://colab.research.google.com/drive/1Rlt43PWo6NYREuDsGT8K5tRg5QqfFdVc?usp=sharing)
1. [Keypoint RCNN Training](https://colab.research.google.com/drive/1aaTWt2rZ-M7YlqIus7aC-84SorjNwl8G?usp=sharing)
1. [Cobb Angle Calculation](https://colab.research.google.com/drive/1Cm32oftsMpsqMH5kLHgr0RtsfLAfiJnF?usp=sharing)

## Models

1. release/yolov5-detection.pt
2. release/keypointsrcnn-weights.pt

## Setup Instructions

Go to [/src](/src) for instructions on how to setup the project on your machine.

## Important References

> Wu, H., Bailey, Chris., Rasoulinejad, Parham., and Li, S., 2017.Automatic landmark estimation for adolescent idiopathic scoliosis assessment using boostnet. Medical Image Computing and Computer Assisted Intervention:127-135. http://www.digitalimaginggroup.ca/members/Shuo/MICCAIAutomatic.pdf

## Acknowledgements

- [👨‍🏫 Dr. Frank I. Elijorde](https://scholar.google.com.ph/citations?user=MbegV1wAAAAJ&hl=en) - Our ever-supportive Thesis Adviser.
- [🤵 Dr. Bobby D. Gerardo](https://scholar.google.com.ph/citations?user=JNlh9WMAAAAJ&hl=en) - Our ever-supportive Thesis Co-Adviser.
- [👨‍🔬 Dr. Shuo Li](http://www.digitalimaginggroup.ca/members/Shuo/MICCAIAutomatic.pdf) - for giving us access to the [SpineWeb Dataset 16](http://spineweb.digitalimaginggroup.ca/Index.php?n=Main.Datasets#Dataset_16.3A_609_spinal_anterior-posterior_x-ray_images)
- [👩‍💼 Dr. Julie Ann Salido](https://scholar.google.com/citations?user=xeoUxA0AAAAJ&hl=en) - for her expertise in computer vision research.
- [👨‍💼 Mr. Paolo Hilado](https://www.researchgate.net/profile/Paolo-Hilado-2) - for his expertise in data science research.
- 👩‍⚕️ Dra. Jocelyn F. Villanueva - for her expertise in radiology.
- 👨‍⚕️ Dr. Christopher Barrera - for his expertise in radiology.

## Cite Our Project

```bibtex
@article{ScolioVis,
  author = {Carlo Antonio Taleon, Glecy Elizalde, Christopher Joseph Rubinos},
  title = {ScolioVis: Automated Cobb Angle Measurement on Anterior-Posterior Spine X-Rays using Multi-Instance Keypoint Detection with Keypoint RCNN},
  year = {2022},
}
```

2022 © Taleon, Elizalde, Rubinos (BSCS4A) - West Visayas State University - College of Information and Communications Technology. All Rights Reserved.
