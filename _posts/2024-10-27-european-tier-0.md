---
layout: post
title: Playing with Europe's Biggest Supercomputers
subtitle: Some experiences 
cover-img: /assets/img/eurohpc/eurohpc_4.jpeg
thumbnail-img: /assets/img/eurohpc/eurohpc_3.jpeg
share-img: /assets/img/eurohpc/eurohpc_3.jpeg
gh-repo: evenmn/evenmn.github.io
gh-badge: [follow]
tags: [EuroHPC, tier-0, LUMI, Leonardo]
comments: true
mathjax: true
author: Even Nordhagen
---

I just came back from the **EuroHPC User Day 2024**, held in Amsterdam on October 22-23, where I had the honor of presenting the outcomes of our research on the EuroHPC supercomputers. For those who may not be familiar, the **European High-Performance Computing Joint Undertaking** (**EuroHPC JU**) oversees the installation, operation, maintenance, and distribution of Europe’s most powerful supercomputers, commissioned by the European Union. This network includes three of the current top 10 supercomputers globally: **LUMI**, **Leonardo**, and **MareNostrum 5**. Additionally, **Jupiter**, which is currently being installed, is expected to soon rank as the world's second most powerful supercomputer. The conference was primarily user-focused, which is why I was invited to share our work there.

![LUMI](/assets/img/eurohpc/LUMI.jpg){: .mx-auto.d-block :}

*LUMI is Europe's most powerful computer, and means 'snow' in Finnish.*

This post will delve into my experiences with the EuroHPC supercomputing facilities, drawing also on the collaborative research that my team and I have detailed in a scientific paper that’s presently undergoing peer review.

![EYE](/assets/img/eurohpc/EYE.jpg){: .mx-auto.d-block :}
*The EuroHPC User Day 2024 was held at the EYE Film Museum, Amsterdam.*

## What Got Me Hooked

First, let me share how I became so fascinated with supercomputers. My journey began in 2017 when I was first introduced to computer clusters. I gained access to the Norwegian **Abel** computer, which at the time was ranked among the world’s top 100 supercomputers. Although the scale of our jobs back then was relatively small by today's standards, the simulation procedures were quite similar.

In 2020, when Abel was decommissioned, the condensed matter group at the University of Oslo acquired part of the system. I was tasked with relocating and setting up this portion in our physics department, giving me valuable hands-on experience in cluster installation and maintenance. This event significantly fueled my interest in high-performance computing.

![EuroHPC](/assets/img/eurohpc/eurohpc.jpeg){: .mx-auto.d-block :}
*Location of the EuroHPC supercomputers. Photo from the first presentation at EuroHPC User Day 2024.*

## First impressions

I’m not going to hide that running jobs on large supercomputers is a cool experience. Witnessing 10,000 GPUs working simultaneously is truly unique and awe-inspiring. Knowing that these machines are behind much of today’s cutting-edge technology adds an extra level of excitement. The societal impact of supercomputers is immense, especially considering the ongoing AI revolution.

For instance, large language models (LLMs) like ChatGPT have become household names, highlighting the role of AI in our daily lives. Beyond conversational AI, machine learning is increasingly vital in the healthcare industry. It holds promise for potentially saving millions of lives by enhancing cancer detection and combating antibiotic resistance. For example, recent studies have demonstrated remarkable success in detecting cancer and fighting antibiotic resistance using machine learning algorithms. The best presentation award at EuroHPC User Day 2024 went to Andrea Di Gioacchino for demonstrating how different microorganisms develop antibiotics using machine learning.

But the thrill of running on these colossal computers goes beyond their societal implications. It's also about the sheer wonder of the technology itself: billions of computations per second, intricate algorithms optimizing performance, and the quest to push the boundaries of what's possible.

![Abel](/assets/img/eurohpc/abel.png){: .mx-auto.d-block :}
*Me and Anders Malthe-Sørenssen collecting nodes from the Abel computer. Photo: Sebastian Winther-Larsen.*

## How These Computers Work

So, how do these supercomputers actually function? Despite their mysterious name, there’s no magic involved in how they operate. Fundamentally, they consist of many standard compute nodes connected via high-speed communication networks. To harness their immense power, tasks must be divided so that different parts can run independently across separate nodes (this is known as parallel processing). 

Imagine you need to count the number of trees worldwide using satellite images and an image analysis algorithm. This task would be nearly impossible to complete sequentially; analyzing each image one by one would take an inordinate amount of time. Thankfully, this problem is well-suited for parallel processing!

Here's how it works: You can dedicate different parts of the supercomputer to analyze images from each continent. One segment of the supercomputer could focus on Europe, another on Asia, and so on. This division alone would vastly speed up the task.

But we can push this even further by assigning each country to different segments of the supercomputer. Now, many parts of the computer are working simultaneously, each focused on a smaller task. This way, the analysis of the satellite images can be conducted much faster compared to a sequential approach.

![SINFO](/assets/img/eurohpc/lumi_sinfo.png){: .mx-auto.d-block :}
*Screen shot of the GPU resources on LUMI. Note that 1,830 nodes are allocated and 811 are draining, each featuring 4 powerful GPUs.*

This is the fundamental principle behind supercomputers: partitioning the machine so that each small segment handles a dedicated task, with many such tasks running in parallel. This method dramatically reduces the wall-clock time, making it feasible to tackle colossal computations that would otherwise be impractical.

## Experiences

All the EuroHPC computers, and in fact, all other supercomputers, run on the Linux operating system. This robust OS is ideal for high-performance computing due to its flexibility and stability. Resource distribution on these systems is managed by the queueing system known as SLURM (Simple Linux Utility for Resource Management). SLURM efficiently queues jobs based on a multi-factor priority list, allocates the necessary resources, and provides comprehensive accounting statistics. 

From my experience, SLURM works exceptionally well. The queue times are generally reasonable, ensuring that computational jobs are processed efficiently without significant delays. However, like all systems, there are challenges, one of the most common being the transfer of large data sets over long distances. This is usually not a cluster-specific problem, as the bottleneck is cables and not bandwidth. If you cannot change the hardware, one way to transfer data faster is by compressing the data. 

## Some Improvements

The human brain is hardwired to favor familiarity; we feel more comfortable in environments we've encountered before. This tendency is why store and restaurant chains design their spaces to look similar or identical, reducing the cognitive load for their customers. However, EuroHPC hasn't fully capitalized on this psychological principle, resulting in varied user experiences across different systems.

Some differences are unavoidable due to hardware variations. For example, LUMI uses AMD GPUs, while most other EuroHPC supercomputers are equipped with NVIDIA GPUs. This hardware distinction naturally leads to differences in the software side of things, necessitating unique configurations and varying user experiences. However, other discrepancies are less rational. One notable example is the divergent firewall policies across these supercomputers. In practice, some systems provide internet access from all nodes (like LUMI), while others restrict internet access to just the login nodes (such as Leonardo). There's even a system like MareNostrum 5, which offers no external communication whatsoever.

These variations translate into differing user experiences, which isn’t ideal. There's a balance to be struck between security and user-friendliness, and in this case, different national computing centers have found different equilibriums. As a result, users must adapt to different environments when transitioning between systems, which can be inefficient and cumbersome.

![EuroHPC](/assets/img/eurohpc/eurohpc_2.jpeg){: .mx-auto.d-block :}
*Some statistics from the EuroHPC User Day 2024. One important message (for us in particular) is that Earth System Sciences and Environmental Studies is slightly underrepresented in the applications compared to computational physics, material and chemical sciences and engineering.*

The unnecessary differences between supercomputers extend to file system architectures and login procedures, impacting user workflows. Some systems use Lustre filesystems, which excel at handling large files but struggle with many small files. This necessitates the use of containers for software dependencies on Lustre systems like LUMI. On other systems, virtual environments might be more efficient.

Moreover, login procedures vary, with some systems requiring two-factor authentication (2FA) for extra security while others do not. This inconsistency in file system use and security protocols creates a fragmented user experience, complicating transitions between different EuroHPC systems.

In our conference paper, we advocate for a more unified policy regarding system setup. Standardizing policies and procedures across EuroHPC systems would simplify transitions from one supercomputer to another, fostering a more consistent and user-friendly experience. This could greatly enhance productivity and reduce the learning curve for users operating across multiple supercomputing systems. Standardizing these elements would allow users to focus more on their research rather than adapting to different system requirements.


## Moving Forward

The good news is that our requests have been heard. EuroHPC plans to implement a unified system policy in 2025. This is a significant leap in the right direction, though I await its actual implementation with cautious optimism. Even with these changes, challenges like large file transfers will remain.

Feel free to drop a comment or question below if you have thoughts or experiences you'd like to share.

![Signature](/assets/img/signature.png){: .mx-auto.d-block :}
