---
layout: page
title: The Schrodinger equation
subtitle: solved with a machine learning approach
#cover-img: /assets/img/onebody.png
share-img: /assets/img/onebody.png
mathjax: true
---

![One-body](/assets/img/onebody.png)
*The one-body density determines the probability of finding a particle at a certain distance from another particle. Here, applied on quantum dots with machine learning prediction to the left.*

The Schrodinger equation is the most accurate equation in physics, and has successfully explained numerious atomic systems. By solving the time-independent Schrodinger equation (below), we know in principle everything about the system. However, this can be a highly challenging task, as any system of more than two objects cannot be described analytically (the three-body problem).

$$\hat{\mathcal{H}}\Psi=E\Psi$$

Here, we propose an alternative method for solving the equation. According to the variational principle, any wave function $$\Psi$$ that is inserted into the Schrodinger equation will yield a system energy $$E$$ larger than (or equal to) the ground-state energy (with a few restrictions). This means that we can optimize a function $$\Psi$$ under minimization the energy $$E$$ and approach the ground-state of a certain system $$\hat{\mathcal{H}}$$. This is the perfect machine learning problem, where $$\Psi$$ is a variational function, for instance an artificial neural network, and the energy is the loss that we want to minimize. At the time we were working on this, it was a quite novel idea. However, Google Deepmind also worked on a similar project with their FermiNet, which got a lot of attention.

% Outline
We will first describe how the trial energy $$E_T$$ can be found for a particular function $$\Psi_T$$, before we move on to the machine learning part where the function $$Psi_T$$ is optimized in order to find the ground state.

(cool image)
*Caption*

## Machine learning stuff
Machine learning is all about optimizing parameters with respect to minimizing a metric. In our case, the metric is the system energy, which is minimized by a gradient method:

$$
E\leftarrow E-\nabla_{\theta}\Delta x
$$

See last section for details about how the energy and gradients is computed.

(show convergence)
*Caption*

## Application: Quantum dots
This method is general, and can in principle be applied to any quantum mechanical system, such as atoms and molecules. However, the system size is limited by the computational cost of the system energy and gradients, and we are in practice restricted to small systems of a few atoms. As a proof of concept, we apply the methodology to quantum dots, which have natural and cheap to calculate basis functions in the Hermite polynomials. Also, the quantum dots have significant applications in the field of technology.

(show quantum dots)

## Some math*
I will try to keep this post easy to read without too many details, but some math is needed to explain how this method works. However, if you are not familiar with quantum mechanics, feel free to skip this section. 

This section is about how the system energy $$E_T$$ is calculated for a particular function $$Psi_T$$, which is done by sampling.

Suppose that we have an initial guess of our function $$\Psi$$, denoted by $$\Psi_T$$ (trial function). Then, the trial energy is given by 

$$
E_T=\int\Psi_T^*\hat{\mathcal{H}}\Psi_T d\tau,
$$

where $$E_T\geq E_0$$ according to the variational principle, with $$E_0$$ as the ground-state energy. By defining the local energy as 

$$
E_L=\frac{1}{\Psi_T}\hat{\mathcal{H}}\Psi_T,
$$

we may write

$$
E_T=\int P_T E_L d\tau
$$

where the probability distribution follows the Born rule:

$$
P_T\equiv \Psi_T^*\Psi_T.
$$

An important thing to recognize here is that the trial energy $E_T$ is the *expectation value* of the local energy $E_L$. This means that the system energy can be found by *sampling* the local energy:

$$
E_T=\langle E_L \rangle = \frac{1}{n}\sum_{i=1}^{n}E_L(i).
$$

Here, it is important to draw the system samples from the correct probability distribution $$P_T$$, which can be done with Metropolis sampling.

## Optimization using machine learning
Once we have calculated the system energy $$E_T$$. However, to change $$\Psi_T$$ in order to minimize the energy $$E_T$$, we need to know how $$E_T$$ changes as we change the parameters in $$\Psi_T$$, $$\theta$$. We need to know $$dE_T(\theta)/d\theta$$. 
