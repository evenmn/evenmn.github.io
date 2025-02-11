---
layout: post
title: WeatherGenerator
subtitle: an AI foundation model for the atmosphere and oceans
#cover-img: /assets/img/deode_cover.jpeg
thumbnail-img: /assets/img/weather-generator/weathergenerator_logo.png
share-img: /assets/img/weather-generator/weathergenerator_logo.png
gh-repo: evenmn/evenmn.github.io
gh-badge: [follow]
tags: [WeatherGenerator, weather, climate, foundation model]
comments: true
mathjax: true
author: Even Marius Nordhagen
---

Separate models for weather, climate, oceans and air polution. However, they are coupled. What if we could make a foundation model that incorporates all this? Which can rollout based on sparse observations. At the same time as it can use its knowledge to forecast variables that it has never seen before. The WeatherGenerator project aims for all this.

The WeatherGenerator is an initiative by the European Centre for Medium-Range Weather Forecasting (ECMWF), and has received 2.3B€ funding from the European Union's Horizon project over a five years period, starting from February 2025. The project is lead by Peter Dueben and Christian Lessig at ECMWF with 14 member states involved. The proposal got full score, which is quite unique.

(illustration)

## What makes the weather generator special?
We already have quite good models for the weather, ocean and climate. What is so special about this project making it worth 2.3B€? The potential of a foundation model is enormous, as it aims to combine all the different weather models into one model. And at the same time do it better than the state-of-the-art models today. And be able to predict things that is not possible with today's model. One example is to forsee electricity prices in the Nordics, mainly powered by green sources like hydro, wind and solar. Why not just tell the foundation model to output the prive prediction directly? The WeatherGenerator will be able to simplify complex pipelines significantly. The project is ambitious, but the utside is huge.

The WeatherGenerator can be compared to recent models for natural language processing (NLP) such as ChatGPT, Gemini and llama. They have partly or entirely replaced a long range of tools and services, including translators, grammar correctors, code linters, personal assistants and much more. Not only do they offer a fast, reliable and easy to use service, but they also outperforms the old methods on most tasks. 

![WeatherGenerator Applications](/assets/img/weather-generator/weathergenerator_applications.png)
*The WeatherGenerator will be able to take reanalysis data, simulation data and observations as inputs, and output predictions, state estimates and high-impact applications. Inputs and outputs can be 100m or 100km, global or local and from the past, present or future with arbitrary temporal resolution.*

## How is it working?
The recent success of NLPs is greatly powered by advances in machine learning and processing units. The idea is a model with a large number of parameter is fed with data, and told to reproduce some result. The parameters in the model are iteratively updated to make the model gradually better at reproducing the result. With this training procedure, the essential information from the datasets is stored in the parameters. Large amounts of data requires a large amount of parameters to store the important information, even though the information is densely compressed. In other words, the important information from the training data is stored in the model. This is called pre-training. To be able to fetch useful information from it, a decoder need to be added to get the exact information we need.

To be able to repeat this for weather forecasting, one needs access to huge amounts of data and computational resources. Fortunately, this is something we do in the weather forecasting community. The idea is to train a large language model (LLM) on large amounts of meteorological and oceanological data, ... 

Technical: parallelization, transformers, 

## Is Europe lagging behind?
USA: big tech microsoft, google, meta, open ai. Aurora and ORBIT. 

China: DeepSeek

Like already mentioned, huge amounts of data and computing resources is needed to develop such models. Europe has large amounts of high quality meteorological data, ECMWF. Europe also have competing high performance computing infrastructure, with 4 of the most powerful super computers according to the TOP500 list at the time writing. The question is: do we have the skills needed to build this?

## Conclusions
Feel free to drop a comment or question below if you have thoughts or experiences you'd like to share.

The WeatherGenerator project (grant agreement No. 101187947) is funded by the European Union. Views and opinions expressed are, however, those of the author(s) only and do not necessarily reflect those of the European Union or the Commission. Neither the European Union nor the granting authority can be held responsible for them.

![Funded by EU](/assets/img/weather-generator/EN-Funded by the EU-POS.png){: .mx-auto.d-block :}

![Signature](/assets/img/signature.png){: .mx-auto.d-block :}
