![preview](/assets/preview.png)

<h3 align="center">✨ ScolioVis ✨</h3>
<p align="center">
  Automated Cobb Angle Measurement on Anterior-Posterior Spine X-Rays using Multi-Instance Keypoint Detection with Keypoint RCNN
</p>
<p align="center"><a href="https://scoliovis.app/">https://scoliovis.app</a></p>
<p align="center">
  <a href="https://github.com/sindresorhus/awesome">
    <img alt="Awesome Badge" src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg" height="20">
  </a>
  <a href="https://github.com/ossu/computer-science">
	<img alt="Vercel Badge Custom" src="assets/vercel_status.png" height="20">
  </a>
</p>

## 📖 Summary

![demo](/assets/demo.gif)

This repository serves as the compiled package of our undergraduate research for West Visayas State University - College of Information and Communications Technology entitled: **_"ScolioVis:
Automated Cobb Angle Measurement on Anterior-Posterior Spine X-Rays using Multi-Instance Keypoint Detection with Keypoint RCNN"_**

In this repo, you can:

- [x] Read our research manuscript.
- [x] Understand our project.
- [x] Try our live, deployed demo on [scoliovis.app](https://scoliovis.app/)
- [x] Try running our project locally.
- [x] Recreate our research/project.

## 📑 Contents

- [:book: About](#book-about)
- [:toolbox: Setup Instructions](#toolbox-setup-instructions)
- [:ledger: Colab Notebooks](#ledger-colab-notebooks)
- [:brain: Models](#brain-models)
- [:scroll: Important References](#scroll-important-references)
- [:trophy: Acknowledgements](#trophy-acknowledgements)
- [:writing_hand: Cite our Project](#writing_hand-cite-our-project)

## :book: About

**ScolioVis** is a tool for automatically measuring the Cobb Angle—the standard measurement to assess Scoliosis. We harness the power of computer vision and machine learning to extract the cobb angles of an anterior-posterior Spine x-ray image. We built this application from the ground-up to an actual implementation in a usable web app.

We trained a Keypoint RCNN model on the [SpineWeb Dataset 16](http://spineweb.digitalimaginggroup.ca/Index.php?n=Main.Datasets#Dataset_16.3A_609_spinal_anterior-posterior_x-ray_images). Boasting a performance of 93% AP at IoU=0.50 on object detections and 57% AP at IoU=0.50 on keypoint detections. The dataset is also part of the [Accurate Automated Spinal Curvature Estimation (AASCE) 2019 Grand Challenge](https://aasce19.grand-challenge.org/Task/). Atlhough we aren't competing, using the performance metric of the challenge, we have achieved an **SMAPE of 8.97** in cobb angle calculation which means ScolioVis as a whole is able to predict cobb angles at **91.03% accuracy**.

A live deployed version of the application is available at [scoliovis.app](https://scoliovis.app/).

## :toolbox: Setup Instructions

👉 Go to [/src](/src) for detailed instructions on how to setup this project on your machine.

Source Repositories:

1. `🎨` [scoliovis-web](https://github.com/Blankeos/scoliovis-web) - Front End Repo
2. `⚡` [scoliovis-api](https://github.com/Blankeos/scoliovis-api) - Back End Repo
3. `🏋️‍♂️` [scoliovis-training](https://github.com/Blankeos/scoliovis-training) - Model Training Repository

## :ledger: Colab Notebooks

1. [Dataset Preprocessing for Keypoint RCNN](https://colab.research.google.com/drive/1Rlt43PWo6NYREuDsGT8K5tRg5QqfFdVc?usp=sharing)
1. [Keypoint RCNN Training](https://colab.research.google.com/drive/1aaTWt2rZ-M7YlqIus7aC-84SorjNwl8G?usp=sharing)
1. [Cobb Angle Calculation](https://colab.research.google.com/drive/1Cm32oftsMpsqMH5kLHgr0RtsfLAfiJnF?usp=sharing)

## :brain: Models

- [scoliovis-training/releases/keypointsrcnn-weights.pt](https://github.com/Blankeos/scoliovis-training/releases/download/latest/keypointsrcnn_weights.pt)
<!-- 2. releases/yolov5-detection.pt _(obsolete)_ -->

## :scroll: Important References

- Any Paper that uses the SpineWeb Dataset 16, must cite the following:

  > Wu, H., Bailey, Chris., Rasoulinejad, Parham., and Li, S., 2017.Automatic landmark estimation for adolescent idiopathic scoliosis assessment using boostnet. Medical Image Computing and Computer Assisted Intervention:127-135. Retrieved from http://www.digitalimaginggroup.ca/members/Shuo/MICCAIAutomatic.pdf

- Our `📄 Thesis Manuscript` and `📘 User Manual` are available on [/doc](/doc).

## :trophy: Acknowledgements

| Name                                                                                        | Contributions                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [👨‍🏫 Dr. Frank I. Elijorde](https://scholar.google.com.ph/citations?user=MbegV1wAAAAJ&hl=en) | Our ever-supportive Thesis Adviser.                                                                                                                                           |
| [🤵 Dr. Bobby D. Gerardo](https://scholar.google.com.ph/citations?user=JNlh9WMAAAAJ&hl=en)  | Our ever-supportive Thesis Co-Adviser.                                                                                                                                        |
| [👨‍🔬 Dr. Shuo Li](http://www.digitalimaginggroup.ca/members/Shuo/MICCAIAutomatic.pdf)        | For giving us access to the [SpineWeb Dataset 16](http://spineweb.digitalimaginggroup.ca/Index.php?n=Main.Datasets#Dataset_16.3A_609_spinal_anterior-posterior_x-ray_images). |
| [👩‍💼 Dr. Julie Ann Salido](https://scholar.google.com/citations?user=xeoUxA0AAAAJ&hl=en)     | For her expertise in computer vision research.                                                                                                                                |
| [👨‍💼 Mr. Paolo Hilado](https://www.researchgate.net/profile/Paolo-Hilado-2)                  | For his expertise in data science research.                                                                                                                                   |
| 👩‍⚕️ Dra. Jocelyn F. Villanueva                                                               | For her expertise in radiology.                                                                                                                                               |
| 👨‍⚕️ Dr. Christopher Barrera                                                                  | For his expertise in radiology.                                                                                                                                               |

<!-- - [👨‍🏫 Dr. Frank I. Elijorde](https://scholar.google.com.ph/citations?user=MbegV1wAAAAJ&hl=en) - Our ever-supportive Thesis Adviser.
- [🤵 Dr. Bobby D. Gerardo](https://scholar.google.com.ph/citations?user=JNlh9WMAAAAJ&hl=en) - Our ever-supportive Thesis Co-Adviser.
- [👨‍🔬 Dr. Shuo Li](http://www.digitalimaginggroup.ca/members/Shuo/MICCAIAutomatic.pdf) - for giving us access to the [SpineWeb Dataset 16](http://spineweb.digitalimaginggroup.ca/Index.php?n=Main.Datasets#Dataset_16.3A_609_spinal_anterior-posterior_x-ray_images)
- [👩‍💼 Dr. Julie Ann Salido](https://scholar.google.com/citations?user=xeoUxA0AAAAJ&hl=en) - for her expertise in computer vision research.
- [👨‍💼 Mr. Paolo Hilado](https://www.researchgate.net/profile/Paolo-Hilado-2) - for his expertise in data science research.
- 👩‍⚕️ Dra. Jocelyn F. Villanueva - for her expertise in radiology.
- 👨‍⚕️ Dr. Christopher Barrera - for his expertise in radiology. -->

## :writing_hand: Cite Our Project

Convert the following `bibtex` to
<a href="https://bibtex.online/?bibtex=%22@article{article,%20type={Bachelor%27s%20Thesis},%20author%20=%20{Taleon,%20Carlo%20Antonio%20and%20Elizalde,%20Glecy%20and%20Rubinos,%20Christopher%20Joseph},%20title%20=%20{ScolioVis:%20Automated%20Cobb%20Angle%20Measurement%20on%20Anterior-Posterior%20Spine%20X-Rays%20using%20Multi-Instance%20Keypoint%20Detection%20with%20Keypoint%20RCNN},%20journal%20=%20{West%20Visayas%20State%20University%20College%20of%20Information%20and%20Communications%20Technology},%20address%20=%20{La%20Paz,%20Iloilo%20City,%20Iloilo,%20Philippines},%20year%20=%20{2023}%20}%22&format=apa">APA</a> | <a href="https://bibtex.online/?bibtex=%22@article{article,%20type={Bachelor%27s%20Thesis},%20author%20=%20{Taleon,%20Carlo%20Antonio%20and%20Elizalde,%20Glecy%20and%20Rubinos,%20Christopher%20Joseph},%20title%20=%20{ScolioVis:%20Automated%20Cobb%20Angle%20Measurement%20on%20Anterior-Posterior%20Spine%20X-Rays%20using%20Multi-Instance%20Keypoint%20Detection%20with%20Keypoint%20RCNN},%20journal%20=%20{West%20Visayas%20State%20University%20College%20of%20Information%20and%20Communications%20Technology},%20address%20=%20{La%20Paz,%20Iloilo%20City,%20Iloilo,%20Philippines},%20year%20=%20{2023}%20}%22&format=mla">MLA</a>
(Credits to [bibtex.online](https://bibtex.online))

```bibtex
@article{article,
  type={Bachelor's Thesis},
  author = {Taleon, Carlo Antonio and Elizalde, Glecy and Rubinos, Christopher Joseph},
  title = {ScolioVis: Automated Cobb Angle Measurement on Anterior-Posterior Spine X-Rays using Multi-Instance Keypoint Detection with Keypoint RCNN},
  journal = {West Visayas State University College of Information and Communications Technology},
  address = {La Paz, Iloilo City, Iloilo, Philippines},
  year = {2023}
}
```

<br />
2023 © Taleon, Elizalde, Rubinos (BSCS4A) - West Visayas State University - College of Information and Communications Technology. All Rights Reserved.
