---
layout: post
title: Langtangen Was Right
subtitle: Reflections on Python's role in AI Development
cover-img: /assets/img/ai-reflections/ai-reflection_cover.png
thumbnail-img: /assets/img/ai-reflections/ai-reflection_thumbnail.png
share-img: /assets/img/ai-reflections/ai-reflection_thumbnail.png
gh-repo: evenmn/evenmn.github.io
gh-badge: [follow]
tags: []
comments: true
mathjax: true
author: Even Nordhagen
---

Artificial intelligence (AI) has made it possible to solve tasks that seemed impossible just a decade ago. Fields that AI has revolutionalized include natural language processing, image synthesis, video generation and [weather forecasting](https://evennordhagen.com/2024-09-12-stretched-grid/) - the field I'm currently most involved in. In this blog post we will discuss what AI actually is, essential components, the current status of AI, the future of AI and Python's role in AI development. It will also include a Tribute to my brilliant informatics lecturer, **Hans Petter Langtangen**.

(some artificial intelligence illustration)

I started my physics studies at University of Oslo (UiO) in 2014, where we were fortunate to learn programming already from the first semester - we were kind of taught to be computational phycisists from the early beginning. Back then there was a huge debate going on at the Faculty of Mathematics and Natural Science which programming language to teach the bachelor students: Many professors believed that low-languages like C/C++ and Fortran was the way to go as they are fast and was the most used for physics applications back then. And to be fair, they were probably the natural choice and had much higher market share than high-level and much slower competitors like Python and MATLAB. **Hans Petter Langtangen**, on the other hand, argued that Python contains all the necessary components that makes it suitable to learn for students without prior programming knowledge - as a scripting language it is pre-compiled, easy to add third-party code and it's open-source. Even with a market share of only 2%, Langtangen convinced the other professors to go for Python. As we will see soon, that was probably a very good idea.

![TIOBE Weather Forecasting Machine Learning Python](/assets/img/ai-reflections/tiobe.png)
*Python's TIOBE rating has increased from 2.4% in 2014 to 23.8% in 2025. Source: tiobe.com*
 
The popularity of Python has exploded in the past years, thanks to the popularity of AI, or more specifically machine learning. Almost all large machine learning projects (>90%) are developed in Python. Machine learning is Python, if you like it or not. However, in many ways Python has been just as important for the machine learning boom as machine learning has been for the Python boom. With that I mean that the machine learning progress is largely fuelled by the great Python libraries built by the community - Pytorch, TensorFlow and Jax - which are all taking advantage of the philosophies in Python. Together with advances in hardware, great Python libraries is the main reason why development in machine learning happens so fast.

## Exactly what is machine learning?
So exactly what is machine learning? Machine learning is the science of training computers without explicitly programming them. Generally, this means that there is some complicated function that we want to optimize with respect to some metric, by using an optimization algorithm. Confused? That's fine, there is a concrete example below that hopefully clarifies.  Even though the term is new, many of the techniques are old and have been used over many decades. For instance, simple gradient descent fits under the *machine learning* umbrella, and has been around since calculus was developed. What *is* actually new is the knowledge of training deep artifical neural networks, known as *deep learning*. Much of the recent progress in machine learning is oriented around this concept, but we will leave the topic of deep learning for later.

![Thermostat Machine Learning Deep Learning Artificial Intelligence Langtangen](/assets/img/ai-reflections/thermostat.png)
*Caption*

### Example: Tuning a thermostat
Instead, we will look at a simple example that demonstrates how machine learning works. Since I'm involved in weather prediction, I will take an example involving temperature: Say that you have thermostat inside your house that has to be adjusted according to the weather outside; when the outside temperature drops the thermostat has to be increased, and when the outside temperature rises, the thermostat should be decreased to keep a constant inside temperature. Exactly how much do we need to adjust the thermostat?

To figure this out, you collect some data. You figure out that when the outside temperature drops 2°C, the thermostat has to be increased 3°C in order to keep the inside temperature. Similarly, when the outside temperature drops 5, 7, 10 and 1°C, the thermostat has to be increased by 7, 10, 13 and 1.5°C. The data is presented in the table below:

|$$i$$| Outside Temp Drop (°C) | Thermostat Increase (°C) |
| :--- | :------ |:--- |
|1| 2 | 3 |
|2| 5 | 7 |
|3| 7 | 10 |
|4| 10 | 13 |
|5| 1 | 1.5 |

There are several ways to solve this problem, and indeed the linear regression problem has an analytical solution. However, here we want to solve it in an iterative machine learning way. What we want is a thermostat increase prediction 

$$\hat{y}_i=w\cdot x_i$$,

that is closest possible to the actual thermostat increase $$y_i$$. This is the *model* that we want to optimize. Here, $$w$$ is the parameter to be tuned and $$x_i$$ is the outside temperature drop. We need to pick a metric to be minimized, called the *loss function*, which is typically the mean-squared error:

$$\mathcal{L}(y,\hat{y}; w)=\frac{1}{5}\sum_{i=1}^5(y_i-\hat{y}_i)^2=\frac{1}{5}\sum_{i=1}^5(y_i-wx_i)^2$$.

Now we need an initial guess of the parameter $$w$$, and we will start with $$w=1$$. The loss then becomes

$$\mathcal{L}(y,\hat{y}; 1)=\frac{1}{5}((2-3)^2+(5-7)^2+(7-10)^2+(10-13)^2+(1-1.5)^2)$$,
$$\mathcal{L}(y,\hat{y}; 1)=\frac{1}{5}(1+4+9+9+0.25)=4.65$$

The mean-squared error is 4.65°C$$^2$$. How can we lower it by adjusting $$w$$? The gradient, or the slope, of $$\mathcal{L}$$ with respect to $$w$$ is 

$$\nabla_w\mathcal{L}(y,\hat{y}; w) = -\frac{2}{5}\sum_{i=1}^5(y_i-wx_i)\cdot x_i$$,
$$\nabla_w\mathcal{L}(y,\hat{y}; 1) = -\frac{2}{5}(-1-2-3-3-0.5)=3.8$$.

This means that the slope in the exact point where $$w=1$$ is equivalent to reducing the loss by 3.8 units when increasing $$w$$ by 1. What it actually tells us is that we need to increase $$w$$ in order to minimize $$\mathcal{L}$$. Usually, we want to adjust $$w$$ according to the gradient:

$$w\leftarrow w-\eta\nabla_w\mathcal{L}(y,\hat{y};w)$$.

Here, $$\eta$$ is the so-called *learning rate*, determining how much the parameters should be adjusted for every step. By adjusting $$w$$ iteratively, we will see that the optimal value in this problem is $$w=1.35$$.

This is an example of an extremely basic machine learning problem, but it illustrates the concepts, including the data, model, loss function and learning rate. In practice, typical machine learning problems include large amounts of data and a much more complex model, often based on neural networks.

## Discoveries that made the machine learning revolution possible
- Back propagation (1996)
- Training neural networks on GPUs (2014)
- Generative adversarial networks (Goodfellow (2014), Radford (2015))
- Residual neural networks - how to train very deep networks (2015)
- Variational autoencoders (2013)
- Transformers (Attention is all you need (2017))
- Diffusion models (Ho (2020))

The AI revolution actually started in 2014...

## Future development
Extrapolate time line to predict the future. 

DeepSeek proves that NVIDIA no longer has monopoly. China has invested largely in machine learning and they are now harvesting from it.

## Conclusions
Python rules the world of machine learning.

Hans Petter Langtangen sadly died in 2016, and I was fortunate to be one of the last student groups to acquire some of his knowledge. 
Langtangen memorial

Feel free to drop a comment or question below if you have thoughts or experiences you'd like to share.

![Signature](/assets/img/signature.png){: .mx-auto.d-block :}
