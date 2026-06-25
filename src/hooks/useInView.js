import { useEffect, useMemo, useRef, useState } from "react";

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const observerOptions = useMemo(
    () => ({ threshold: options.threshold ?? 0.15, ...options }),
    [options]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (observerOptions.once !== false) observer.unobserve(el);
        }
      },
      observerOptions
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [observerOptions]);

  return [ref, inView];
}
