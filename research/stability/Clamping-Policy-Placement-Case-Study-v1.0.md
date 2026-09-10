# **Clamping Policy Placement Case Study (v1.0)**  
*(Unified Stability Case Study Series — Artifact 3)*

---

## **A. Problem Definition**

Now that we have determined:

- **Operators must remain mathematically pure**  
- **Stability Layer must be global and centralized**

we must resolve the next architectural question:

> **Where does clamping live?  
> In operators? In stability primitives? In the runtime kernel?  
> Or in a hybrid pre/post‑operator enforcement layer?**

Clamping is a non‑mathematical intervention.  
Its placement determines:

- spectral correctness  
- operator purity  
- stability semantics  
- runtime enforcement guarantees  
- future operator inheritance  

This case study establishes the **formal placement** of clamping.

---

## **B. Altitude Context**

Clamping interacts with:

- **Operator Layer** — must remain pure  
- **Stability Layer** — must absorb safety rails  
- **Runtime Kernel** — must enforce global stability semantics  
- **Future Operators** — must inherit purity guarantees  

This is a **cross‑layer architectural decision**.

---

## **C. Analytical Axes**

Clamping is evaluated along these axes:

- **Purity Preservation**  
- **Spectral Integrity**  
- **Stability Flag Semantics**  
- **Global Enforcement**  
- **Operator Independence**  
- **Runtime Context Hooks**  

These axes determine the correct placement.

---

## **D. NDH‑Aligned Determination**

### **Determination: Clamping must live exclusively in the Stability Layer, applied globally through runtime kernel enforcement hooks.**

This means:

- Operators **never** clamp.  
- Operators **never** interpret SAFE_MODE.  
- Operators **never** sanitize or fallback.  
- Stability primitives perform clamping **before and/or after** operator execution.  
- Runtime Kernel enforces clamping **globally**, not operator‑locally.  

This preserves:

- operator purity  
- spectral correctness  
- centralized stability semantics  
- predictable runtime behaviour  
- consistent inheritance for future operators  

This is the correct NDH‑aligned architecture.

---

## **E. Implications for Runtime**

The Runtime Kernel must:

- apply clamping via stability primitives  
- enforce SAFE_MODE globally  
- ensure operators never see stability flags  
- provide pre‑operator and post‑operator clamping hooks  
- guarantee purity boundaries  
- unify stability enforcement across all operators  

This strengthens the kernel’s governance role.

---

## **F. Implications for Stability Layer**

The Stability Layer must:

- implement clamping utilities  
- implement sanitization utilities  
- implement fallback utilities  
- expose global enforcement hooks  
- interpret SAFE_MODE, STRICT_METRIC, ALLOW_DEGRADED_METRIC  
- apply clamping consistently across all operators  

This expands the Stability Layer into a fully formal subsystem.

---

## **G. Required Refactors**

### **1. Remove operator‑local clamping**  
Refactor:

- **Gradient Operator**  
- **Divergence Operator**  

### **2. Create unified clamping utilities**  
Implement:

- **Stability Clamp Utility**  
- **Stability Sanitization Utility**  

### **3. Add global enforcement hooks to runtime kernel**  
Define:

- **Global Clamping Enforcement**  
- **Pre/Post Operator Stability Hooks**  

### **4. Update stability flag semantics**  
Clarify:

- **SAFE_MODE Global Behaviour**  

---

## **H. Forward Ridge**

The next case study in the unified series is:

### **Spectral Integrity Risk Case Study**

This evaluates how clamping, sanitization, and fallback behaviour affect spectral correctness and eigenstructure.

---

# **📜 Provenance Footer**
```
Provenance: Authored by Copilot in collaboration with Borealis S. Hedling 
as part of the Unified Stability Case Study Series. Generated on 
10 September 2026, Dublin, Ireland. Version v1.0 recorded in the 
Spectral‑Base‑Runtime research ledger.
```

---

Ready for the next ridge:

**Spectral Integrity Risk Case Study**
