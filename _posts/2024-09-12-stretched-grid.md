---
layout: post
title: Regional Data-Driven Weather Modeling 
subtitle: with a Global Stretched-Grid Approach 
cover-img: /assets/img/stretched_grid/20240127T06_24_48_60-2.png
thumbnail-img: /assets/img/stretched_grid/20240127T06_24_48_60-2.png
share-img: /assets/img/stretched_grid/20240127T06_24_48_60-2.png
gh-repo: evenmn/evenmn.github.io
gh-badge: [follow]
tags: [AIFS, stretched-grid]
comments: true
mathjax: true
author: Even Nordhagen
---

We have developed the most accurate model for regional weather prediction available, thanks to recent advances in machine learning weather modeling. Our model is based on graph neural networks and employs a stretched grid with higher resolution over the target regional domain.

Our latest Preprint: [arXiv:2409.02891](https://arxiv.org/abs/2409.02891)

## Machine Learning Weather Prediction
Recent machine learning models have surpassed conventional numerical weather prediction models in key metrics such as 2m temperature and mean sea-level pressure {% cite bi2023 kurth2023 lang2024 %}. However, these models typically offer lower spatial resolution (~31 km) compared to the best regional forecasting systems, which achieve resolutions of 1-3 km. Our goal was to leverage the progress in machine learning models for regional weather prediction.

## Stretched Grid
There are various methods to produce regional forecasts. The most common method is the limited area model (LAM) approach, where the boundaries of the regional model are updated by a global model. This approach requires running a separate global model, adding complexity to the forecasting framework. Our approach, instead, uses a global stretched grid with higher resolution over the regional domain. This is achieved through the flexibility of graph neural networks (GNNs), which accommodate arbitrary grids.

<div class="text-center">
    <img src="/assets/img/stretched_grid/gnn.pdf" alt="GNN" style="width: 70%;">
</div>
*The neural network is based on an encoder-processor-decoder architecture. The encoder transfers information from an arbitrary grid to a mesh (latent space). The processor manages communications between nodes over both short and long distances. The decoder transfers information from the mesh back to the grid.*

## Results
Now it's time to evaluate our model. Most people are primarily interested in temperature and precipitation when checking weather forecasts. Our model's temperature predictions have significantly lower errors compared to conventional numerical weather prediction models (see figure below). Notably, our model outperforms the MEPS ensembles, the leading regional model over the Nordics, particularly for the initial lead time. Additionally, our model provides precipitation forecasts that are as accurate as those from the MEPS ensembles.

Temperature             |  Precipitation
:-------------------------:|:-------------------------:
![Temp](/assets/img/stretched_grid/rmse_temp.png)  |  ![Precip](/assets/img/stretched_grid/ets_precip.png)

*Temperature assessed using root mean-squared error (left), and precipitation evaluated using the equitable threat score (ETS) (right).*

For many practical applications, temperature extremes are of particular concern, including dangerous heatwaves, cold spells, and frost events. Our model outperforms both MEPS and IFS in daily minimum and maximum temperature predictions across all lead times. Another notable advantage of our machine learning model is the significantly reduced forecasting time compared to conventional numerical weather prediction models; it generates forecasts in a matter of minutes, rather than hours.

<div class="text-center">
    <img src="/assets/img/stretched_grid/temperature.png" alt="Temperature" style="width: 70%;">
</div>
*Root mean-squared error of minimum and maximum 24-hour temperatures between lead times of 24 and 60 hours. The stretched-grid model (red line) consistently shows lower errors than the leading global (IFS) and regional (MEPS) numerical weather prediction models.*

However, the model performs less effectively in predicting instantaneous wind, convection, and mean sea-level pressure. Wind and convection fields are sharp, and the model's lower performance can be attributed to the smoothing effect of the chosen loss function. We plan to address this issue by extending our model to an ensemble approach in the future. As for mean sea-level pressure, regional models generally perform worse than global ones. This may be due to the smoothness of pressure fields and the importance of long-range interactions, often extending beyond the regional domain. While we could improve this by weighting the global domain more heavily, it would impact other variables. Therefore, we may not focus extensively on improving mean sea-level pressure, as long as other variables remain accurate.

## Conclusions
We have developed a highly effective machine learning model for regional weather prediction. The model performs as well as or better than leading numerical weather prediction models in terms of temperature and precipitation. However, due to smoothing, it struggles to predict sharp features such as strong winds, convection, and other extreme events. We plan to address this by implementing an ensemble approach. Additionally, our model generates forecasts significantly faster than conventional numerical weather prediction models, enabling more frequent high-resolution forecasts.

## References
{% bibliography --file stretched-grid %}

Feel free to drop a comment or question below if you have thoughts or experiences you'd like to share.

<div class="signature">
    <img src="/assets/img/signature.png" alt="Signature" style="width: 50%;">
</div>
