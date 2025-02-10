---
layout: post
title: Simulating Realistic Water
subtitle: an All-Atom Water Model
cover-img: /assets/img/water_header.png
thumbnail-img: /assets/img/water_thumbnail.png
share-img: /assets/img/water_thumbnail.png
gh-repo: evenmn/evenmn.github.io
gh-badge: [follow]
tags: []
comments: true
mathjax: true
author: Even Marius Nordhagen
---

Computer experiments offer information that is not available in real experiments, at the same time as they are less error prone and often cheaper. This is the main reason why ever more research is based on computer simulations. However, can we really rely on computer simulations when making important decision? How do we know that the computer experiments capture effects as the real experiments? The answer is that the simulations has to be tested and verified on the exact thing that we aim to investigate, as computer simulations will never capture all aspects of the real world. 

(computer simulations image)

This blog post will be about computer simulations of water: A highly important, yet highly complex substance to model. When looking at real systems, it is hard to ignore water. Water is the most common liquid on Earth, and is found in most geological, biological and (fill in) environments. At the same time, water features some really strange features like (fill in). making it difficult to model. 

To overcome these challenges, the most common water models are rigid, meaning that the distance between the oxygen and hydrogen atoms are kept fixed. This discards/supresses all the reactions, acidity and many other chemical processes that are crucial to realistically model a real system. To be able to model this, we need a dissociative water model. This is exactly what we are presenting [in our recent work](https://pubs.acs.org/doi/full/10.1021/acs.jpcb.4c06389), published in Journal of Physical Chemistry C.

![Water molecule](/assets/img/dissociative_water.png){: .mx-auto.d-block :}
*Real water molecules can react with the surroundings. Most water models do not capture this chemical nature of water.*

## Reactive water
A dissociative water model means that each water molecule is allowed to dissolve - meaning that water molecules can lose hydrogen atoms to the surroundings (form OH$$^-$$-groups) or take hydrogen atoms from the surroundings (form hydronium). The reaction can be described as

$$
\mathrm{H}_2\mathrm{O}\rightleftharpoons\mathrm{OH}^-+\mathrm{H}^+,
$$

or

$$
2\mathrm{H}_2\mathrm{O}\rightleftharpoons\mathrm{H}_3\mathrm{O}^+ + \mathrm{OH}^-.
$$

These reactions are among the main procedures in liquid water, and are crucial to include to model realistic water. For instance, acidity is measured by the pH-scale where the acidity is defined by the logarithm of the concentration of $$\mathrm{H}^+$$:

$$
\mathrm{pH} = -\log\left(\frac{N_{\mathrm{H}^+}}{N}\right),
$$

where $$N_{\mathrm{H}^+}$$ is the number of $$\mathrm{H}^+$$ ions and $$N$$ is the total number of molecules. In other words, $$N_{\mathrm{H}^+}/N$$ is just the concentration of hydrogen ions. A neutral pH-value is around 7, meaning that there is about one hydrogen ion per 10 million water molecules from the definition above. In contrast, an acid liquid of pH 4 will have one hydrogen ion per 10,000 molecules and so on. 

## An all-atom water model
So how can we incorporate this behavior of water into a water model? One solution is to let an atom detach from the molecule if the force exerted on the atom exceeds some threshold. However, this would create a binary dynamics of atom attachment - detachment, which in the end of the day is unphysical. A better solution is to stick to an all-atom model, which treats all atoms equally where a molecule is no concept. Atoms follow the same laws no matter if they are part of a molecule or free. This is how atoms behave in the nature.

![Water molecule](/assets/img/water_images-1.png){: .mx-auto.d-block :}

*The force acting on a particle $$i$$ is determined by the distance to its neighbor atoms, $$r_{ij}$$ and $$r_{ik}$$, and the angle between three atoms $$\theta_{jik}$$.*

We have relied on the so-called Vashishta model for interactions between atoms, manifesting that four forces act between two atoms:

- Charge-charge force (Coulomb), $$\propto 1/r^2$$
- Change-dipole force, $$\propto 1/r^5$$
- Dipole-dipole force (van der Waals force), $$\propto 1/r^7$$
- Repulsive force steming from the overlap of electron clouds, $$\propto ~1/r^{12}$$

Here $$r$$ is the distance between the two atoms. Note that all these forces are actually Coulombic forces, but since each atom is treated like a charged point particle, polarization of electrons is not possible.

The total two-atom potential is given by

$$
V_{ij}^{(2)}(r)=\frac{H_{ij}}{r^{\eta_{ij}}}+\frac{Z_iZ_j}{r}e^{-r/\lambda_1}-\frac{D_{ij}}{2r^4}e^{r/\lambda_4}-\frac{W_{ij}}{r^6},
$$

where $$H_{ij}$$, $$\eta_{ij}$$, $$Z_i$$, $$Z_j$$, $$\lambda_1$$, $$D_{ij}$$, $$\lambda_4$$ and $$W_{ij}$$ are water-specific parameters. The exact shape of the interaction is not the important here, the main take-away is that for each combination of atom types there are 8 parameters to be found.

There is an additional force acting when there are more than two atoms present. This is important to force an angle between three atoms, in particular important when modelling water. It works by introducing an angular spring term with some equilibrium angle:

$$
V_{jik}^{(3)}(r_{ij}, r_{ik}, \theta_{jik})=B_{jik}\exp\left(\frac{\gamma}{r_{ij}-r_0}+\frac{\gamma}{r_{ik}-r_0}\right)\frac{(\cos\theta_{jik}-\cos\bar{\theta}_{jik})^2}{1+C_{jik}(\cos\theta_{jik}-\cos\bar{\theta}_{jik})^2},
$$

where $$B_{jik}$$, $$\gamma$$, $$r_0$$, $$\cos\bar{\theta}_{jik}$$ and $$C_{jik}$$ are again parameters to be found. There is a last parameter, $$r_c$$, determining the cutoff distance, we do not care about interactions between atoms separated by a distance larger than this. Summing up, there are 14 parameters to be found for each possible three-atom combination. For water, with two atom types (hydrogen and oxygen), there are $$2^3=8$$ possible three-atom combinations, giving 112 parameters in total.

Some of these parameters are equal due to symmetries, while some of them can be deduced from physical experiments. Still, there are many parameters to be found, way more than possible with a simple grid search. We need a systematic way of doing this. 

(Genetic algorithm illustration: starting from a random population. Evaluate the objective fitness of each individual. Let the fittest individuals multiply, while the least fittest individuals die without offsprings. Exploitation. Exploration: Allow for mutation and swapping parameters/genes.)

## Optimizing water model
Inspired by evolution, we use a genetic algorithm to find optimal values for the parameters.

(how genetic algorithms work)

(hierarchical genetic algorithm)

(local optimization: Nelder-Mead simplex method)

(Silica-water illustration, with siloxane bridges)

## Adding more components
Following the same procedure, we can add more components. However, every time we add a new component, interaction parameters between the existing components and the new component, as well as between the new component itself has to be found. For the third parameter, this corresponds to $$3^3-2^3=19$$ new three-atom combinations.

(in general difficult)

(can use intuition to reduce number of parameters significantly)

(silicon dioxide very relevant for geological processes)

## Conclusions

For more details, please read our paper published in Journal of Chemical Physics C (..)

Disclaimer: All illustrations used here were generated with Ovito and TikZ.

Feel free to drop a comment or question below if you have thoughts or experiences you'd like to share.

![Signature](/assets/img/signature.png){: .mx-auto.d-block :}
