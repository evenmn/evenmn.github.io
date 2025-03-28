---
layout: post
title: Langtangen Was Right
subtitle: Reflections on the AI Development and Predictions for the Future
cover-img: /assets/img/deode_cover.jpeg
thumbnail-img: /assets/img/deode_thumbnail.jpeg
share-img: /assets/img/deode_thumbnail.jpeg
gh-repo: evenmn/evenmn.github.io
gh-badge: [follow]
tags: []
comments: true
mathjax: true
author: Even Nordhagen
---

% attract readers attention
What is AI, components, current status, future. AI, or machine learning as I like to call it (apologize the clickbait) has made it possible to solve tasks that seemed impossible just a decade ago. Language modelling, image and video generation and weather forecasting - the field I'm currently most involved in (feel free to read my blog posts about weather forecasting using machine learning if you're interested). ChatGPT and DeepSeek. A Tribute to Hans Petter Langtangen

% UiO and Hans Petter Langtangen
Started on physics in 2014 fortunate to learn programming already from the first semester - we were kind of taught to be computational phycisists from the beginning. Back then there was a huge debate which programming language to teach the students: Many professors believed that low-languages like C/C++ and Fortran was the way to go as they are fast and was the most used for physics applications back then. And to be fair, they were probably the natural choice and had much higher market share than high-level and much slower competitors like Python and MATLAB. Hans Petter Langtangen, on the other hand, argued that Python contains all the necessary components that makes it suitable to learn for students without prior programming knowledge - as a scripting language it is pre-compiled, easy to add third-party code and it's open-source. Even with a market share of only 2%, Langtangen convinced the other professors to go for Python. As we will see later in this post, that was probably a very good idea.

(The TIOBE index)
*Python's TIOBE rating has increased from 2.4% in 2014 to 23.1% in 2025. Source: tiobe.com*
 
The popularity of Python has exploded in the past years, thanks to the popularity of machine learning. Almost all large machine learning projects (>90%) are developed in Python. Machine learning is Python. However, in many ways Python has been just as important for the machine learning boom as machine learning has been for the Python boom. With that I mean that the machine learning progress is largely fuelled by the great libraries built by the community - Pytorch, TensorFlow and Jax - which are all taking advantage of the philosophies in Python. Together with advances in hardware, great Python libraries is the main reason why development in machine learning happens so fast.

% what is machine learning
## Exactly what is machine learning?
Machine learning is the science of training computers without explicitly programming them. Even though the term is new, many of the techniques are old and have been used over many decades. For instance, simple gradient descent fits under the *machine learning* umbrella, and has been around since calculus was developed. I will go through a simple example ...
(demonstrate machine learning with an everyday problem where one parameter has to be tweaked - use gradient update)

## Recent advances that made machine learning revolution possible
- Training neural networks on GPUs (2014)
- Generative adversarial networks (Goodfellow (2014), Radford (2015))
- Residual neural networks - how to train very deep networks (2015)
- Variational autoencoders (2013)
- Transformers (Attention is all you need (2017))
- Diffusion models (Ho (2020))

## Future development
Extrapolate time line to predict the future. 

DeepSeek proves that NVIDIA no longer has monopoly. China has invested largely in machine learning and they are now harvesting from it.

## Conclusions
Langtangen memorial

![Destination Earth Digital Twin](/assets/img/deode_1.gif){: .mx-auto.d-block :}
*The first official MTG-FCI visible image from EUMETSAT (left) and 12-hour simulation with ECMWF’s Integrated Forecasting System (IFS) at 2.8 km resolution (right), valid for 18 March 2023 at 12:00 UTC. Credit: EUMETSAT/ECMWF*

Feel free to drop a comment or question below if you have thoughts or experiences you'd like to share.

![Signature](/assets/img/signature.png){: .mx-auto.d-block :}
