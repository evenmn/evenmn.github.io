---
layout: post
title: Langtangen Was Right
subtitle: Reflections on Python's role in AI Development
cover-img: /assets/img/ai-reflections/ai-reflection_cover.png
thumbnail-img: /assets/img/ai-reflections/ai-reflection_thumbnail.png
share-img: /assets/img/ai-reflections/ai-reflection_thumbnail.png
gh-repo: evenmn/evenmn.github.io
gh-badge: [follow]
tags: [AI boom, artificial intelligence, machine learning, Hans Petter Langtangen]
comments: true
mathjax: true
author: Even Nordhagen
---

Artificial intelligence (AI) has made it possible to solve tasks that seemed impossible just a decade ago. Fields that AI has revolutionalized include natural language processing, image synthesis, video generation and [weather forecasting](https://evennordhagen.com/2024-09-12-stretched-grid/) - the field I'm currently most involved in. In this blog post we will discuss what AI actually is, essential components, the current status of AI, the future of AI and Python's role in AI development. It will also include a Tribute to my brilliant informatics lecturer, **Hans Petter Langtangen**.

![AI Illustration Neural Network Machine Learning](/assets/img/ai-reflections/ai.png)
*Artificial intelligence attempts to emulate neural networks in the brain*

I started my physics studies at University of Oslo (UiO) in 2014, where we were fortunate to learn programming already from the first semester - we were kind of taught to be computational phycisists from the early beginning. Back then there was a huge debate going on at the Faculty of Mathematics and Natural Science which programming language to teach the bachelor students: Many professors believed that low-languages like C/C++ and Fortran was the way to go as they are fast and was the most used for physics applications back then. And to be fair, they were probably the natural choice and had much higher market share than high-level and much slower competitors like Python and MATLAB. **Hans Petter Langtangen**, on the other hand, argued that Python contains all the necessary components that makes it suitable to learn for students without prior programming knowledge - as a scripting language it is pre-compiled, easy to add third-party code and it's open-source. Even with a market share of only 2%, Langtangen convinced the other professors to go for Python. As we will see soon, that was probably a very good idea.

![TIOBE Weather Forecasting Machine Learning Python](/assets/img/ai-reflections/tiobe.png)
*Python's TIOBE rating has increased from 2.4% in 2014 to 23.8% in 2025. Source: tiobe.com*
 
The popularity of Python has exploded in the past years, thanks to the popularity of AI, or more specifically machine learning. Almost all large machine learning projects (>90%) are developed in Python. Machine learning is Python, if you like it or not. However, in many ways Python has been just as important for the machine learning boom as machine learning has been for the Python boom. With that I mean that the machine learning progress is largely fuelled by the great Python libraries built by the community - Pytorch, TensorFlow and Jax - which are all taking advantage of the philosophies in Python. Together with advances in hardware, great Python libraries is the main reason why development in machine learning happens so fast.

## Exactly what is machine learning?
So exactly what is machine learning? Machine learning is the science of training computers without explicitly programming them. Generally, this means that there is some complicated function that we want to optimize with respect to some metric, by using an optimization algorithm. Confused? That's fine, there is a concrete example below that hopefully clarifies.  Even though the term is new, many of the techniques are old and have been used over many decades. For instance, simple gradient descent fits under the *machine learning* umbrella, and has been around since calculus was developed. What *is* actually new is the knowledge of training deep artifical neural networks, known as *deep learning*. Much of the recent progress in machine learning is oriented around this concept, but we will leave the topic of deep learning for later.

![Thermostat Machine Learning Deep Learning Artificial Intelligence Langtangen](/assets/img/ai-reflections/thermostat.png)
*In the example below, machine learning is used to find the optimal thermostat setting, given the temperature change outside.*

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

Here, $$\eta$$ is the so-called *learning rate*, determining how much the parameters should be adjusted for every step. By adjusting $$w$$ iteratively, we will see that the optimal value in this problem is $$w=1.35$$. So for every degree the outside temperature drops, we need to increase the thermostat by 1.35°C.

This is an example of an extremely basic machine learning problem, but it illustrates the concepts, including the data, model, loss function and learning rate. In practice, typical machine learning problems include large amounts of data and a much more complex model, often based on neural networks.

## An artificial neural network
It is hard to talk about recent developments in machine learning without talking about artifical neural networks. Artificial neural networks are inspired by neural networks in the brain, where information is sent between nodes and a certain node is "activated" when receiving certain signals. And more importantly, artificial neural networks, from now just neural networks, are so-called universal function approximators, meaning that they are very flexible functions that can approximate any continuous function [hornik 1989]. Mathematically, a *two-layer perceptron*, one of the simpler neural networks, can be described by

$$\hat{y}_i=a^{(2)}\left(\sum_jw_{ij}^{(2)}\left(a^{(1)}\left(\sum_k w_{jk}^{(1)} \cdot x_k\right)\right)\right)$$.

Here, $$w^{(1)}$$ and $$w^{(2)}$$ are *weight matrices* of the two layers and $$a^{(1)}$$ and $$a^{(2)}$$ are corresponding *activation functions*. In the example above, we could probably get a better fit by replacing the linear model with this model, but with the cost of many tunable parameters. To compute the gradients in this case, we would need to use the backpropagation algorithm. More about that below.

## Discoveries that made the machine learning revolution possible
Machine learning requires many essentail components. From algorithms to hardware to model architecture. This list could easily be much longer, but I will here focus on my subjective meaning of discoveries that hade been essential for the machine learning revolution that we see today.

### Back propagation
Back propagation allows us to compute the gradients of complex models such at deep neural networks. It is a technique of computing gradients starting from the end of the model and propagating forward, hence the name. The algorithm was discovered in 1986, and all deep learning relies on it [Rumelhart 1986](https://www.nature.com/articles/323533a0). If we want to make metaphores to the brain, [Lillicrap 2020](https://www.nature.com/articles/s41583-020-0277-3)

### Efficient hardware
Graphical Processing Units (GPUs) are computational units that can process very many small tasks simultaneously. Like the name suggests, they were developed to process graphics used in video games in particular. At some point around 2010, some people realized that GPUs could be used to accelerate training of neural networks. One of the most influental demonstrations of the use came in 2012, when Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton showed how a deep neural network outperformed traditional methods for image classification by a huge margin [Krizhevsky 2012].

### Variational autoencoders
Variational autoencoders  (VAE) were invented in 2013 as an innovative way of compressing data and generating new data points [Kingma 2013]. A VAE consists of a network that does compressing (an encoder) and a network that does decompressing (a decoder). The whole idea is to make the VAE learn how to compress a sample, and decompress it back to the sample sample, effectively storing all important information in a compressed tensor representation (called the *latent space*). This latent space can then be perturbed to generate new samples.

### Generative models
Another breakthrough came in 2014, when Ian Goodfellow et al. demonstrated that neural networks can be used to generate images [Goodfellow 2014]. The idea was innovative: By setting two networks to compete each other, one with the task of generating fake images (*the generator*) and the other with the task of discriminating between real and fake images (*the discriminator*). The method was called generative adversarial networks (GANs). According to Goodfellow himself he got the idea on a party, went home to investigate the idea and had a prototype ready in the morning.

### Residual neural networks
The stability of training deep neural networks was an issue for a long time -- they tent to forget essential information during the forward pass. In 2015, a group at Microsoft Research observed that by passing the information across several layers at once, the information flow was more efficient [He 2015]. This component was called a *skip-connection*, and is one of the basic ingredients in modern deep learning.

### Transformers
The transformer architecture is based on a multi-head attention mechanism. The idea is to convert whole blocks of text into *tokens*, which are numerical representations that the computers can work with. The attention mechanism prioritize key tokens over less important tokens, and gives thus better context. The attention mechanism was proposed in the early 2010s, but it was first in 2017 that it became in particular useful, when Google reasearchers invented an attention mechanism that can be largely parallelized [Vaswani 2017].

### Diffusion models
Diffusion models are generative models inspired by stochastic physics [Ho 2020]. I have used diffusion models as a solution to the [inverse frictional design problem](https://evennordhagen.com/projects/inversedesign/). It's crazy to think about that diffusion models were invented just 5 years ago. Since then, diffusion models have taken over the entire market of generative modelling. They outperform GANs both when it comes to stability and performance. Also, they are not only used to generate images, they can also sequences of realistic images turned into videos. State-of-the-art diffusion models are applied in the latent space, where the data first is compressed by a variational autoencoder [Rombach 2021]. This is called a latent diffusion model, and can reduce the complexity and computational cost significantly. 

### Self-supervised learning
One of the most important advances in recent years is self-supervised learning, where models learn patterns from raw data without requiring labeled examples. This approach has become a cornerstone of foundation models such as GPT, BERT, and CLIP, where models are pre-trained on vast amounts of text or images using tasks like predicting missing words or matching images to captions. It enables more scalable and generalizable learning.

## What's next in machine learning?
Despite recent breakthroughs, machine learning is far from reaching its peak. Looking ahead, several key developments are shaping its future.

The hardware landscape is shifting. **DeepSeek** and similar models have shown that NVIDIA no longer holds an exclusive grip on AI acceleration. Competitors like AMD are catching up, leading to a more open and competitive ecosystem. Meanwhile, China’s large-scale investments in AI are beginning to pay off, with major advances in model training and deployment emerging from Chinese tech labs.

On the software side, **Edge AI** is gaining traction—bringing intelligence directly to devices like phones, sensors, and robots. These models can run locally, offering faster responses and better privacy without relying on cloud infrastructure. Closely related is **Agent-based AI**, which moves beyond passive prediction toward systems that can reason, plan, and act autonomously in complex environments.

Finally, entertainment industries are quickly embracing AI. In movies and video games, generative models are transforming how scenes are created, characters behave, and experiences are personalized.

## Conclusion
Artificial intelligence has come a long way—from academic curiosity to a force transforming nearly every aspect of modern life. At the heart of this revolution lies a powerful synergy between software and hardware, algorithms and data, creativity and code. Python, thanks to its simplicity and community support, emerged as the glue that held it all together. And in hindsight, Hans Petter Langtangen’s vision to teach Python before it was mainstream turned out to be remarkably prescient.

Langtangen’s legacy lives on—not just in lines of Python code or Jupyter notebooks, but in the minds of students he inspired to think computationally, creatively, and courageously. I consider myself fortunate to be one of them.

Feel free to drop a comment or question below if you have thoughts or experiences you'd like to share.

![Signature](/assets/img/signature.png){: .mx-auto.d-block :}
