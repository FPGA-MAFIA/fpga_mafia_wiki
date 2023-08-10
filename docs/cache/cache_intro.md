---
title: ""
---

<div align="center">

# Cache Architecture for the Mesh project
<br />

</div>

<div align="center">



 Noam Sabban

Fourth year project towards a bachelor's degree in Engineering

Advisor: Amichai Ben-David
</div>


# Author
*If you contribute to this document, please add your name here so the reader will know who to go to if they have questions.*

|**Author**|**Email address**|
| :- | :- |
|**Amichai Ben-David**|**abendavid@nvidia.com**|
|**Noam Sabban**|**Sabban.noam@gmail.com**|
|||


# <a name="_toc1008912806"></a>**Revision History**
*Please supply the date, author, and a brief description of major revisions of this document.*

|**Revision**|**Date**|**Author**|**Description**|
| :- | :- | :- | :- |
|**0.01**|24/11/2022|Amichai Ben-David|Initial Draft – skeleton & overview|
||04/01/2023|Noam Sabban|Added Merge Buffer description|
||17/01/2023|Noam Sabban|Interfaces parameters update|
|||||
|||||




# **Contents**
[   Author	](#_toc1813475768)

[   Revision History	](#_toc1008912806)

[   List of Figures	](#_toc549082651)

[	Open Issues](#_toc1653690369)

[	Introduction](#_toc497346094)

[	References](#_toc1831783840)

[	Glossary](#_toc287259830)



<a style={{ display: 'block' }} href="../cache/cache_overview">Overview</a>
<br/>
<a style={{ display: 'block', marginLeft: '1em' }} href="../cache/cache_overview#section-4-1">Top Level Cache diagram</a>
<a style={{ display: 'block', marginLeft: '1em' }} href="../cache/cache_overview#section-4-2">Cache Parameters</a>
<a style={{ display: 'block', marginLeft: '1em' }} href="../cache/cache_overview#section-4-3">Cache Size & Address bits</a>
<a style={{ display: 'block', marginLeft: '1em' }} href="../cache/cache_overview#section-4-4">Top-Level-Interface</a>
<a style={{ display: 'block', marginLeft: '1em' }} href="../cache/cache_overview#section-4-5">Core Interface</a>
<a style={{ display: 'block', marginLeft: '1em' }} href="../cache/cache_overview#section-4-6">FM Interface</a>
<a style={{ display: 'block', marginLeft: '1em' }} href="../cache/cache_overview#section-4-7">Pipe Interface</a>

<br/>

[	High Level Block Description](../cache/High_level_block_description)

[	Transaction Queue (TQ)](../cache/cache_overview#section-4-4)

[	Pipe](#_toc1128226896)

[	Tag Array](#_toc768632131)

[	Data Cache Array](#_toc248060331)

[	High level Transaction Flows](#_toc1779312326)

[   Evicting Cache-Line](#_toc968886961)

[   Core Write Hit](#_toc129901246)

[   CORE WRITE MISS](#_toc1298113976)

[   Core Read Hit](#_toc762484656)

[   Core Read Miss.](#_toc1368926867)

[   Stall](#_toc86425335)

[   FSM Errors](#_toc1574458668)

[   MRU](#_toc1429789757)

[   FILL](#_toc73125539)

[   Merge Buffer Behavior](#_toc1444127171)

[   Read After Write (same Cache Line, word hit)](#_toc761038880)

[   Read After Write (same Cache Line, word Miss)](#_toc1647958394)

[   Write After Write (Same Cache Line, same/different word)](#_toc1077647588)

[   Write After Read (Same Cache Line, Same/different Word)](#_toc854682441)

[   Read After Read (Same Cache Line, Same/different Word)](#_toc2125413379)

[   Assumption & Assertions](#_toc2054752113)

<a style={{ display: 'block', marginLeft: '1em' }} href="#_toc1030114760">Core Interface Assumption:</a>

[   Far Memory Interface Assumption:](#_toc826535799)

[   Appendix](#_toc93555976)

[   Future Features](#_toc1491728741)

[   ABD Notes:](#_toc1529489236)




# **1. List of Figures**
[Figure 1 - Top Level DC_CACHE Diagram	6](#_toc120191342)

[Figure 3- Tag Array Table	8](#section-4-1)

[*Figure 2- Data Array*	8](https://d.docs.live.net/6977cd27928fbf9b/Desktop/BIU%20-%20mesh/HAS_Cache.docx#_Toc120191344)
