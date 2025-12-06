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

Today, weather forecasting is a complicated beast consisting of many components. First, observations are collected from surface measurements, satellites, radars, etc., and assimilated into a grid. This grid is then used as the initial state of numerical weather prediction (NWP) models to produce forecasts. Afterwards, the predictions are typically post-processed before the final forecast is produced. Not only is this entire framework complex, making development demanding, but it is also slow, often requiring hours to produce a medium-range forecast.

There is also a myriad of different models, each with specific applications. Some focus on the atmosphere, some on surface variables, others on seasonal forecasting. Some run at very high resolution, others at coarse resolution. The WeatherGenerator aims to cover all these applications in a single task-independent model.

<div class="text-center">
    <img src="/assets/img/weather-generator/wg_illustration.png" alt="WeatherGenerator" style="width: 70%;">
</div>
*WeatherGenerator can perform a wide range of tasks, including forecasting and downscaling.*

The initiative is coordinated by the European Centre for Medium-Range Weather Forecasts (ECMWF) and funded by the European Union’s Horizon programme over four years starting in February 2025. The project is led by Peter Dueben and Christian Lessig at ECMWF, with 16 partners involved. The proposal received a full score from the European Council, underscoring the importance of this effort.

# What is so special about the WeatherGenerator?

We already have strong operational models for weather and climate. So what makes this project special?

A foundation model for Earth system data is a genuine game changer. The potential benefits are enormous. Not only will it simplify modelling pipelines, but, given the impressive performance of recent machine-learning-based forecasting models, there is a real possibility that WeatherGenerator will match or surpass today’s state-of-the-art prediction systems.

Its applications span weather and climate prediction, renewable energy, flood forecasting, food security, health, and biosphere studies — 22 distinct application areas in total. A single, unified model could drastically simplify complex pipelines.

WeatherGenerator will be trained on an extensive list of datasets, including reanalyses like ERA5 and CERRA, forecasts from ECMWF’s Integrated Forecasting System (IFS) and the Destination Earth digital twins, and observational data from satellites, radars, and surface stations.

Methodologically, WeatherGenerator is similar to large language models (LLMs) such as ChatGPT, Gemini, and Llama. These models have replaced a huge range of task-specific tools—translators, grammar checkers, code linters, personal assistants, and more. They are fast, easy to use, and often outperform the old tools.

Think about how the smartphone replaced many task-specific devices such as digital cameras, watches, MP3 players, and recorders. Foundation models are a similar leap, but for software.

There are already foundation models for weather and climate that demonstrate the concept. Microsoft developed Aurora {% cite bodnar2024 %}, a 1.3‑billion‑parameter model for climate, weather, and air pollution. The ORBIT model {% cite wang2024a %}, however, has 113 billion parameters. WeatherGenerator is expected to reach up to 100 billion parameters, placing it close to ORBIT.

![WeatherGenerator Applications](/assets/img/weather-generator/weathergenerator_applications.png){: .mx-auto.d-block :}
*WeatherGenerator can take reanalyses, simulations, and observations as inputs, and output predictions, state estimates, and high‑impact applications. Inputs and outputs can range from 100 m to 100 km resolution, global or local, past or future.*

## Exactly how does it work?

The recent success of LLMs is powered by advances in machine learning and computing hardware. The idea is to start with a model with a huge number of degrees of freedom, making it extremely flexible. This model is usually an artificial neural network, as they can approximate almost anything and we know how to train them.

The model is then trained via regression to fit large datasets. This pre‑training stores essential information from the data in the model’s parameters. Large datasets require many parameters, even if the information is compressed. To extract useful outputs, a suitable decoder is added.

To do this for weather forecasting, we need massive amounts of data and computational resources. WeatherGenerator will be trained on reanalyses, simulations, and observations from synoptic stations, radars, lidars, satellites, and aviation. Training will use EuroHPC systems such as LUMI, Leonardo, and the upcoming Jupiter.

![Large Language Models WeatherGenerator Machine Learning Weather Forecasting](/assets/img/weather-generator/llm1.png)
*LLMs compress input data into a lower-dimensional latent space.*

Most modern LLMs rely on transformer architectures with self‑attention. A major turning point came in 2017 when highly parallelizable transformers became available, making large‑scale training feasible using thousands of GPUs.

Meteorological observations are extremely sparse and imbalanced. Surface stations, radars, and lidars are unevenly distributed; aviation data exists only along flight paths; satellites have gaps in space and time. To handle this, we use representation learning or masked‑token modelling: parts of the input are masked and the model learns to reconstruct them, just like ChatGPT is trained.

![Representation Learning Masked Token Modelling WeatherGenerator Machine Learning Weather Forecasting](/assets/img/weather-generator/masked_token_modelling.png)
*Masked token modelling.*

WeatherGenerator is expected to contain up to 100 billion parameters, making it one of the largest LLMs built for weather and climate.

# Is Europe lagging behind?

Most foundational machine‑learning research has been concentrated in North America, where private companies like Google, Microsoft, OpenAI, and Meta have enormous financial resources. China has also invested heavily in AI development, leading to models such as DeepSeek, which currently outperform some leading American LLMs.

One European success story is DeepMind, though it is now owned by Google. This raises the question: is Europe falling behind the US and Asia?

![AI Investments US China EU27 UK](/assets/img/weather-generator/oecd_preqin.png)
*Investments in AI are far higher in the US and China compared to the EU. Source: OECD/Preqin.*

The EU’s Horizon programme is, in many ways, a response to this gap. Significant funding is now directed toward AI research, indicating a recognition of the need to catch up.

Meteorology is a special case, however. ECMWF has been the global leader in weather forecasting for decades, though this position is now challenged by big‑tech efforts. Training large foundation models requires massive datasets, huge compute, and the expertise to use them effectively. Europe has all three, particularly in meteorology.

This gives Europe a realistic chance to build the next generation of weather‑forecasting systems. Other domains may be more challenging due to limited data availability.

# Conclusions

WeatherGenerator aims to build the next generation of weather‑forecasting models. This is crucial for warning against increasingly frequent extreme weather events and for maintaining Europe’s position as a world leader in global weather prediction. Given Europe’s unparalleled meteorological datasets and HPC resources, there is good reason to believe we can achieve this.

For more information, see the official ECMWF blog post.

![Signature](/assets/img/signature.png){: .mx-auto.d-block :}

Feel free to leave a comment or question below.

*The WeatherGenerator project (grant agreement No. 101187947) is funded by the European Union. Views and opinions expressed are those of the author(s) only and do not necessarily reflect those of the European Union or the Commission.*

![Funded by EU](/assets/img/weather-generator/EN-Funded by the EU-POS.png){: .mx-auto.d-block :}

## References
{% bibliography --file weathergenerator %}
