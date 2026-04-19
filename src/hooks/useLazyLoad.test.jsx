import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { useRef, useEffect } from 'react';
import { useLazyLoad } from './useLazyLoad';

describe('useLazyLoad', () => {
  let observerCallback;
  let observeMock;
  let unobserveMock;
  let originalIO;

  beforeEach(() => {
    observeMock = vi.fn();
    unobserveMock = vi.fn();
    originalIO = globalThis.IntersectionObserver;

    globalThis.IntersectionObserver = function (callback) {
      observerCallback = callback;
      this.observe = observeMock;
      this.unobserve = unobserveMock;
    };
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
  });

  // Helper component that uses the hook and attaches the ref to a real DOM element
  function TestComponent({ onResult, options }) {
    const [ref, isVisible] = useLazyLoad(options);
    useEffect(() => {
      onResult({ isVisible });
    }, [isVisible, onResult]);
    return <div ref={ref} data-testid="observed" />;
  }

  it('starts with isVisible=false', () => {
    let result = {};
    render(<TestComponent onResult={(r) => (result = r)} />);
    expect(result.isVisible).toBe(false);
  });

  it('observes the element on mount', () => {
    render(<TestComponent onResult={() => {}} />);
    expect(observeMock).toHaveBeenCalledTimes(1);
  });

  it('sets isVisible=true when element intersects', () => {
    let result = {};
    render(<TestComponent onResult={(r) => (result = r)} />);

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    expect(result.isVisible).toBe(true);
  });

  it('unobserves element after first intersection', () => {
    render(<TestComponent onResult={() => {}} />);

    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    expect(unobserveMock).toHaveBeenCalled();
  });

  it('does not set isVisible when not intersecting', () => {
    let result = {};
    render(<TestComponent onResult={(r) => (result = r)} />);

    act(() => {
      observerCallback([{ isIntersecting: false }]);
    });

    expect(result.isVisible).toBe(false);
  });

  it('cleans up observer on unmount', () => {
    const { unmount } = render(<TestComponent onResult={() => {}} />);
    unmount();
    expect(unobserveMock).toHaveBeenCalled();
  });
});
