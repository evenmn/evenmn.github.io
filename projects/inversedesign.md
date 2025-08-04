---
layout: page
title: Inverse Frictional Design
subtitle: Leveraging Diffusion Models
gh-repo: evenmn/evenmn.github.io
gh-badge: [follow]
tags: [dissociative, water, molecular dynamics, Vashishta, genetic algorithm]
comments: false
mathjax: true
author: Even Nordhagen
---
---

Measuring the frictional coefficient between two surfaces is a well-established task, performed for centuries through both experiments and simulations.  
However, the inverse problem—**designing a surface that yields a desired frictional coefficient**—is far more challenging. We refer to this task as *inverse frictional design*. Traditional approaches rely on computationally intensive algorithms and deep physical insight.  

Here, we propose a novel machine learning approach using a **conditional diffusion model** to generate surfaces that exhibit target frictional properties.

<img src="/assets/img/inversedesign/img1.jpeg" alt="Inverse design" style="width: 50%;">
<p><em>Molecular dynamics simulations are used to evaluate the frictional properties of generated surfaces.</em></p>

## Methodology
Our approach falls within the category of generative AI, borrowing techniques from image synthesis. Specifically, we use a **diffusion model** capable of iteratively denoising a random sample until it matches the learned distribution.  
In this context, the sample corresponds to a surface topography, and the model is conditioned on the **static friction force**. Similar strategies have recently been applied in material science, such as by Bastek & Kochmann {% cite bastek2023 %}.

### Dataset
To construct our training dataset, we generated surface topographies using **simplex noise** {% cite perlin2002 %}, which produces visually realistic structures.  
Each surface served as the initial condition for molecular dynamics simulations, where we measured the resulting static friction force.  
The dataset—comprising **10,000 surfaces paired with frictional measurements**—represented the most computationally demanding part of this work.

<img src="/assets/img/inversedesign/img2.jpeg" alt="Inverse design" style="width: 90%;">
<p><em>Methodology overview.</em></p>

### Model Training
We employ a **UNet architecture** as the denoising backbone of our diffusion model.  
Once trained, the network can generate a surface designed to exhibit a specified static friction force.  
We validate this by simulating the generated surfaces and comparing the measured friction to the target values.

## Results
The generated surfaces closely match the desired static friction forces.  

<img src="/assets/img/inversedesign/img3.jpeg" alt="Inverse design" class="img-responsive-center">
<p><em>Comparison between real surfaces (upper three rows) and generated surfaces (lower three rows).</em></p>

Interestingly, we find that **cluster size** is the dominant factor affecting friction when the real contact area is standardized.  
Contrary to common expectations, a **few large contact clusters** produce stronger frictional interfaces than many small ones.

---

Read the full article here:  
<a href="https://pubs.acs.org/doi/10.1021/acs.jpcc.5c02768" style="color: black; text-decoration: none;">
  <strong>EM Nordhagen, HA Sveinsson, A Malthe-Sørenssen</strong>.  
  <em>Tailoring Frictional Properties of Surfaces Using Diffusion Models</em>.  
  <strong>The Journal of Physical Chemistry C</strong> (2025).
</a><br>

## References
{% bibliography --file inversedesign %}

