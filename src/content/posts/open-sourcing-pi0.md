---
title: "K8s For the Uninitiated ML Engineer"
date: "2025-02-04"
preview: "We are releasing the weights and code for π₀ as well as our new π₀-FAST autoregressive model."
---

We're excited to announce that we're open-sourcing π₀, our foundational model for robotic control. This release includes:

## Model Architecture

The architecture consists of:

```python
class Pi0(nn.Module):
    def __init__(self):
        self.encoder = VisionTransformer()
        self.policy_head = PolicyMLP()
```

## Performance Metrics

Our model achieves state-of-the-art performance on standard benchmarks:

| Metric | Score |
|--------|-------|
| Success Rate | 95.2% |
| Planning Time | 12ms |

## LaTeX Example

The policy can be described by the equation:

$$
\pi_\theta(a_t|s_t) = \text{softmax}(f_\theta(s_t))
$$

Where $f_\theta$ represents our neural network parameterized by $\theta$. 