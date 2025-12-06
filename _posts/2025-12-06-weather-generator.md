---
layout: post
title: WeatherGenerator
subtitle: Advancing Earth System Science with Innovative AI
cover-img: /assets/img/weather-generator/weathergenerator_cover.png
thumbnail-img: /assets/img/weather-generator/weathergenerator_logo.png
share-img: /assets/img/weather-generator/weathergenerator_logo.png
gh-repo: evenmn/evenmn.github.io
gh-badge: [follow]
tags: [WeatherGenerator, weather, climate, foundation model]
comments: true
mathjax: true
author: Even Nordhagen
---

The WeatherGenerator is a four-year EU-funded initiative that aims to build a European foundation model for weather and climate.

Today, weather forecasting is a complicated beast that consists of several components. First, observations are fetched from surface measurements, satellites, radars etc.. and assimilated into a grid. Then this grid is used as the initial state of numerical weather prediction (NWP) models to produce predictions. Thereafter, the predictions are typically post-processed before the final forecast is produced. Not only is this entire framework complex and makes development demanding, but it is also slow, requiring hours to produce a medium-range forecast. There is also a myriad of different models, with often specific applications. Some models focus on the atmosphere, some focus on surface variables and other focus of season-to-season forecasting. Different models focus on different resolution. The WeatherGenerator aims to cover all these applications in one single model, the model is *task independent*.  

<div class="text-center">
    <img src="/assets/img/weather-generator/wg_illustration.png" alt="WeatherGenerator" style="width: 70%;">
</div>
*WeatherGenerator is able to do a long range of tasks, including forecasting and downscaling.*

The WeatherGenerator is an initiative coordinated by the European Centre for Medium-Range Weather Forecasting (ECMWF), and has received funding from the European Union's Horizon project over a four-year period, starting from February 2025. The project is lead by Peter Dueben and Christian Lessig at ECMWF with 16 partners involved. The proposal got full score from the European Council, witnessing an extremely important project.

# What is so special about the WeatherGenerator?
We already have quite good models for the weather and climate. What is so special about this project? A foundation model for the weather systems is a game changer, and the potential benefits of a foundation model is enormous. Not only will it simplify the modelling pipelines, but, given the recent impressive performance demonstrated by machine learning models for weather forecasting, it also a good chance that the WeatherGenerator will be equal to or better than the current state-of-the-art weather prediction systems. Its applications span weather and climate prediction, renewable energy, flood forecasting, food security, health, and biosphere studies, encompassing 22 specific application areas. The WeatherGenerator will be able to simplify complex pipelines significantly. The project is ambitious, but the upside is huge.

WeatherGenerator will be trained on an extensive list of datasets, including reanalysis datasets like ERA5 and CERRA, weather forecasts like ECMWF's Integrated Forecasting System (IFS) and the Destination Earth digital twins, and observed data from satellites, radars and surface stations.

In methodology, WeatherGenerator can be compared to recent large language models (LLMs) such as ChatGPT, Gemini and llama. They have partly or entirely replaced a long range of task-specific tools and services, including translators, grammar correctors, code linters, personal assistants and much more. Not only do they offer a fast, reliable and easy to use service, but they also outperform the old methods on many tasks.

Think about how the smartphone replaced many task-specific deviced such as digital cameras, watches/stop watches/alarm clocks, MP3/music players, and recorders. In many ways, foundation models are equally large advances, but for softwares.

There are already some examples on foundation models for weather and climate that proves the concept and demonstrate their capabilities. In particular, Microsoft have developed Aurora {% cite bodnar2024 %}, a foundation model for climate, weather and air pollution featuring 1.3 billion parameters trained on diverse data. However, compared to the ORBIT model {% cite wang2024a %} featuring 113 billion parameters, that is a tiny model. Notably, both these models were developed in the United States. WeatherGenerator is expected to contain up to 100 billion parameters, placing itself close to the ORBIT model.

![WeatherGenerator Applications](/assets/img/weather-generator/weathergenerator_applications.png){: .mx-auto.d-block :}
*The WeatherGenerator will be able to take reanalysis data, simulation data and observations as inputs, and output predictions, state estimates and high-impact applications. Inputs and outputs can be 100m or 100km, global or local and from the past, present or future with arbitrary temporal resolution.*

## Exactly how does it work?
The recent success of LLMs is greatly powered by advances in machine learning and processing units, [like discussed in a previous post](https://evennordhagen.com/2025-05-04-ai-reflections/). The idea is to start from a model with a large degrees of freedom, being very flexible. This model is usually an artificial neural network, as they can be fit to almost anything and we know how to train them. The model is then told to do regression, fitting the model to the desired data. With this training procedure, the essential information from the datasets is stored in the parameters. Large amounts of data requires a large amount of parameters to store the important information, even though the information is densely compressed. In other words, the important information from the training data is stored in the model. This is called pre-training. To be able to fetch useful information from it, a decoder must to be added to get the desired information.

To be able to repeat this for weather forecasting, one needs access to huge amounts of data and computational resources. Fortunately, this is something we do in the weather forecasting community. The idea is to train an LLM on large amounts of meteorological data, including reanalysis, simulation data and observations from synoptical stations, radars, lidars, satelites and aviation. We will then utilize the EuroHPC computing infrastructures, like LUMI, Leonardo and the upcoming Jupiter clusters, for development, training and testing. I have written about EuroHPC and my experiences with running on the infrastructure [in a recent post](https://evennordhagen.com/2024-10-27-european-tier-0/). 

![Large Language Models WeatherGenerator Machine Learning Weather Forecasting](/assets/img/weather-generator/llm1.png)
*LLMs compress the input data to a lower-dimensional latent space, where...*

Most of today's LLMs are based on a transformer architecture, with a self-attention mechanism. This was for a long time very costly, as the nature of attention made it hard to split up the tasks in small sub-tasks and run them in parallel. A turning point came in 2017, when [highly parallelizable transformers](www.evenmn.github.io) where made available. This made it possible to train LLMs on large infrastructures with thousands of graphics processing units. 

(LLM illustration)

Meteorological observations are in general extremely sparse and inbalanced. The synoptical stations, radars and lidars on the surface are not evenly distributed, aviation data is mostly at certain altitudes and satelite data is sparse in both space and time. How can we deal with this? The aim for this project is to use representation learning/self-supervised learning/masked token learning to make the model fill in missing data. The way it works is that we mask the available data and let the model fill in the masks. It is penalized if the masks are incorrectly filled in. This is also used when training chatbots like ChatGPT, where words are masked in sentences.

![Representation Learning Masked Token Modelling WeatherGenerator Machine Learning Weather Forecasting](/assets/img/weather-generator/masked_token_modelling.png)
*Masked token modelling*

The WeatherGenerator is expected to contain up to 100 billion parameters, one of the largest LLMs for weather and climate.

## Is Europe lagging behind?
So far, most of the basic research on machine learning has been centered around Northern America, and private companies with massive financial muscles like Google, Microsoft, OpenAI and Meta have been central. At the same time, the Chinese government has invested heavily **[is this correct and consistent with illustration below?]** in development of machine learning, with [fill in...] This has, among other things, led to the DeepSeek LLM which at the moment outperforms the leading American LLMs ChatGPT, Genini and llama. One European success history is the british company DeepMind, who have been influential, but are now owned by Google. Are Europe lagging behind USA and Asia when it comes to development of machine learning? Are we about to lose the AI race?

![AI Investments US China EU27 UK](/assets/img/weather-generator/oecd_preqin.png)
*The investments in AI is close to 10 times as high in the US compared to the European Union. Chinese investments are also significantly higher than in EU. Source: [OECD/Preqin](https://oecd.ai/en/data?selectedArea=investments-in-ai-and-data&selectedVisualization=vc-investments-in-ai-by-country&visualizationFiltersHash=eyJkYXRlIjpbIjIwMTIiLCIyMDI0Il0sImNvbnRyb2xzIjp7ImxvZ1NjYWxlIjpmYWxzZX0sImZpbHRlcnMiOnsiSU5EVVNUUlkiOiItLSBBbGwgaW5kdXN0cmllcyAtLSJ9LCJlbnRpdGllcyI6eyJDb3VudHJ5Q29kZSI6WyJVU0EiLCJDSE4iLCJFVTI3IiwiR0JSIl19LCJpbmRpY2F0b3JzIjp7IkluZGljYXRvciI6IlN1bV9vZl9kZWFscyJ9fQ%3D%3D)*

The European Union's Horizon project is in some ways an answer to this question, where a lot of money is devoted to machine learning. It is apparent that EU have realized that we are behind and want to solve it by throwing money on machine learning.

In meteorology the situation is quite special, as ECMWF has been the leading provider of global weather forecasting for decades, a position that is now being threatened by American and Asian big-tech companies. However, like already mentioned, huge amounts of data and computing resources is needed to develop and train LLMs. Europe has large amounts of high quality meteorological data, in particular located at the ECMWF storage facilities. Europe also have competing high performance computing infrastructure, with 4 of the most powerful super computers according to the TOP500 list at the time writing. The last ingredient we need to make a state-of-the-art foundation model is the skills needed to develop such models. I believe that we do, and that chances are good that we can develop the next generation weather forecasting model. I'm more doubious about other domains where we cannot compete with the data availability. 

(ECMWF leading illustration)

## Conclusions
The WeatherGenerator is a project that aims to build the next generation weather forecasting model. This is important to warn against the ever more frequent extreme weather events and secure Europe's position as the leading provider of global weather forecasting. Given the available data and computer resources in Europe, it is likely that we will be able to do this. 

For more information about the initiative, visit [this ECMWF blog post](https://www.ecmwf.int/en/about/media-centre/news/2024/weathergenerator-project-aims-recast-machine-learning-earth-system).

![Signature](/assets/img/signature.png){: .mx-auto.d-block :}

Feel free to drop a comment or question below if you have thoughts or experiences you'd like to share.

*The WeatherGenerator project (grant agreement No. 101187947) is funded by the European Union. Views and opinions expressed are, however, those of the author(s) only and do not necessarily reflect those of the European Union or the Commission. Neither the European Union nor the granting authority can be held responsible for them.*

![Funded by EU](/assets/img/weather-generator/EN-Funded by the EU-POS.png){: .mx-auto.d-block :}

## References
{% bibliography --file weathergenerator %}
