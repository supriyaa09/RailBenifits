import { useEffect, useState, useRef } from "react";
import {
  X,
  RotateCcw,
  Play,
  Pause,
  Square,
  Contrast,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Type,
  AlignLeft,
  MousePointer,
  HelpCircle,
  Link as LinkIcon,
} from "lucide-react";

/** Universal Accessibility stick-person icon (ISO 7001) */
function UniversalAccessibilityIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="12" cy="4" r="2" />
      {/* Arms outstretched */}
      <path d="M7 8h10" />
      {/* Torso */}
      <path d="M12 8v6" />
      {/* Legs */}
      <path d="M12 14l-4 6" />
      <path d="M12 14l4 6" />
    </svg>
  );
}

interface AccessibilityPrefs {
  textSize: number; // 100, 110, 120, 130, 140, 150
  textSpacing: "normal" | "medium" | "large";
  lineHeight: "normal" | "medium" | "large";
  highContrast: boolean;
  lowSaturation: number; // 0, 50, 100
  invertColors: boolean;
  highlightLinks: boolean;
  cursorSize: "normal" | "medium" | "large" | "xl";
  pauseAnimations: boolean;
  dyslexiaFriendly: boolean;
  adhdMode: boolean;
  hideImages: boolean;
  adhdBandHeight: "small" | "medium" | "large";
  adhdHighlightParagraph: boolean;
  adhdReadingLine: boolean;
}

const defaultPrefs: AccessibilityPrefs = {
  textSize: 100,
  textSpacing: "normal",
  lineHeight: "normal",
  highContrast: false,
  lowSaturation: 100,
  invertColors: false,
  highlightLinks: false,
  cursorSize: "normal",
  pauseAnimations: false,
  dyslexiaFriendly: false,
  adhdMode: false,
  hideImages: false,
  adhdBandHeight: "medium",
  adhdHighlightParagraph: false,
  adhdReadingLine: false,
};

const ACC_PREFS_KEY = "railassist:accessibility-preferences";

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [prefs, setPrefs] = useState<AccessibilityPrefs>(defaultPrefs);

  // Text-To-Speech state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // ADHD Guide mouse state
  const [mouseY, setMouseY] = useState(0);

  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ACC_PREFS_KEY);
      if (stored) {
        setPrefs(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load accessibility preferences:", e);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  const savePrefs = (newPrefs: AccessibilityPrefs) => {
    setPrefs(newPrefs);
    try {
      localStorage.setItem(ACC_PREFS_KEY, JSON.stringify(newPrefs));
    } catch (e) {
      console.error("Failed to save accessibility preferences:", e);
    }
  };

  // Keyboard shortcut Ctrl + F2 to toggle panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "F2") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle click outside to close the panel
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  // ADHD Focus Guide cursor tracking
  useEffect(() => {
    if (!prefs.adhdMode) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefs.adhdMode]);

  // Apply styles dynamically to the document root based on preferences
  useEffect(() => {
    const root = document.documentElement;

    // 1. Text Size
    root.style.fontSize = `${prefs.textSize}%`;

    // 2. Text Spacing
    root.classList.toggle("accessibility-spacing-medium", prefs.textSpacing === "medium");
    root.classList.toggle("accessibility-spacing-large", prefs.textSpacing === "large");

    // 3. Line Height
    root.classList.toggle("accessibility-line-height-medium", prefs.lineHeight === "medium");
    root.classList.toggle("accessibility-line-height-large", prefs.lineHeight === "large");

    // 4. High Contrast
    root.classList.toggle("accessibility-high-contrast", prefs.highContrast);

    // 5. Invert Colors
    root.classList.toggle("accessibility-invert", prefs.invertColors);

    // 6. Saturation (Apply via filter alongside invert)
    const filters: string[] = [];
    if (prefs.lowSaturation !== 100) {
      filters.push(`saturate(${prefs.lowSaturation}%)`);
    }
    if (prefs.invertColors) {
      filters.push("invert(1) hue-rotate(180deg)");
    }
    root.style.filter = filters.length > 0 ? filters.join(" ") : "";

    // 7. Highlight Links
    root.classList.toggle("accessibility-highlight-links", prefs.highlightLinks);

    // 8. Cursor Size
    root.classList.toggle("accessibility-cursor-medium", prefs.cursorSize === "medium");
    root.classList.toggle("accessibility-cursor-large", prefs.cursorSize === "large");
    root.classList.toggle("accessibility-cursor-xl", prefs.cursorSize === "xl");

    // 9. Pause Animations
    root.classList.toggle("accessibility-pause-animations", prefs.pauseAnimations);

    // 10. Dyslexia Friendly Mode
    root.classList.toggle("accessibility-dyslexia", prefs.dyslexiaFriendly);

    // 11. Hide Images
    root.classList.toggle("accessibility-hide-images", prefs.hideImages);

    // 12. ADHD Mode
    root.classList.toggle("accessibility-adhd-active", prefs.adhdMode);
    root.classList.toggle(
      "accessibility-adhd-highlight-p",
      prefs.adhdMode && prefs.adhdHighlightParagraph,
    );
  }, [prefs]);

  // Handle Speech Synthesis (TTS)
  const getSpeakText = () => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) return selection;

    const mainEl = document.querySelector("main") || document.body;
    const tempEl = mainEl.cloneNode(true) as HTMLElement;
    tempEl
      .querySelectorAll("script, style, button, nav, footer, header, .accessibility-widget-panel")
      .forEach((el) => el.remove());
    return tempEl.textContent?.trim() || "";
  };

  const playSpeech = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();
    const text = getSpeakText();
    if (!text) return;

    const ut = new SpeechSynthesisUtterance(text);
    ut.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    ut.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    setUtterance(ut);
    window.speechSynthesis.speak(ut);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseSpeech = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const stopSpeech = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const resetAll = () => {
    savePrefs(defaultPrefs);
    stopSpeech();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/40 print:hidden"
        title="Open Accessibility Menu (Ctrl + F2)"
        aria-label="Open Accessibility Menu"
      >
        <UniversalAccessibilityIcon className="h-6 w-6" />
        <span className="mt-1 text-[8px] font-bold tracking-wider uppercase">Ctrl+F2</span>
      </button>

      {/* Slide-out Accessibility Control Panel (non-blocking settings drawer) */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed right-0 top-0 bottom-0 z-50 max-w-md w-full bg-card shadow-elevated flex flex-col h-full border-l border-border transition-transform duration-300 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-panel-title"
        >
          {/* Header */}
          <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between shadow-soft">
            <div className="flex items-center gap-2">
              <UniversalAccessibilityIcon className="h-5 w-5" />
              <h2 id="accessibility-panel-title" className="text-md font-semibold">
                Accessibility options
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] bg-primary-soft/20 text-primary-foreground px-2 py-0.5 rounded-md font-mono border border-primary-soft/10">
                Ctrl+F2
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                aria-label="Close panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Panel Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Text Size Control */}
            <div className="space-y-3 bg-muted/30 p-4 rounded-xl border">
              <div className="flex justify-between items-center">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Type className="h-4 w-4 text-primary" />
                  Text Size
                </div>
                <span className="text-xs font-bold text-primary">{prefs.textSize}%</span>
              </div>
              <div className="flex gap-2">
                {[100, 110, 120, 130, 140, 150].map((size) => (
                  <button
                    key={size}
                    onClick={() => savePrefs({ ...prefs, textSize: size })}
                    className={`flex-1 text-xs py-2 font-bold rounded-lg border transition-all ${
                      prefs.textSize === size
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border text-foreground hover:bg-primary-soft/10"
                    }`}
                  >
                    {size}%
                  </button>
                ))}
              </div>
            </div>

            {/* Text Spacing & Line Height */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3 bg-muted/30 p-4 rounded-xl border">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <AlignLeft className="h-4 w-4 text-primary" />
                  Text Spacing
                </div>
                <div className="flex flex-col gap-2">
                  {(["normal", "medium", "large"] as const).map((space) => (
                    <button
                      key={space}
                      onClick={() => savePrefs({ ...prefs, textSpacing: space })}
                      className={`text-xs py-1.5 font-bold rounded-lg border capitalize transition-all ${
                        prefs.textSpacing === space
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-background border-border text-foreground hover:bg-primary-soft/10"
                      }`}
                    >
                      {space}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 bg-muted/30 p-4 rounded-xl border">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <AlignLeft className="h-4 w-4 text-primary" />
                  Line Height
                </div>
                <div className="flex flex-col gap-2">
                  {(["normal", "medium", "large"] as const).map((lh) => (
                    <button
                      key={lh}
                      onClick={() => savePrefs({ ...prefs, lineHeight: lh })}
                      className={`text-xs py-1.5 font-bold rounded-lg border capitalize transition-all ${
                        prefs.lineHeight === lh
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-background border-border text-foreground hover:bg-primary-soft/10"
                      }`}
                    >
                      {lh}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Saturation Control */}
            <div className="space-y-3 bg-muted/30 p-4 rounded-xl border">
              <div className="flex justify-between items-center">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Sun className="h-4 w-4 text-primary" />
                  Color Saturation
                </div>
                <span className="text-xs font-bold text-primary">
                  {prefs.lowSaturation === 0
                    ? "Grayscale"
                    : prefs.lowSaturation === 50
                      ? "Low"
                      : "Normal"}
                </span>
              </div>
              <div className="flex gap-2">
                {[0, 50, 100].map((val) => (
                  <button
                    key={val}
                    onClick={() => savePrefs({ ...prefs, lowSaturation: val })}
                    className={`flex-1 text-xs py-2 font-bold rounded-lg border transition-all ${
                      prefs.lowSaturation === val
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border text-foreground hover:bg-primary-soft/10"
                    }`}
                  >
                    {val === 0 ? "Grayscale" : val === 50 ? "Low" : "Normal"}
                  </button>
                ))}
              </div>
            </div>

            {/* Cursor Size Control */}
            <div className="space-y-3 bg-muted/30 p-4 rounded-xl border">
              <div className="flex justify-between items-center">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <MousePointer className="h-4 w-4 text-primary" />
                  Cursor Size
                </div>
                <span className="text-xs font-bold text-primary uppercase">{prefs.cursorSize}</span>
              </div>
              <div className="flex gap-2">
                {(["normal", "medium", "large", "xl"] as const).map((cursor) => (
                  <button
                    key={cursor}
                    onClick={() => savePrefs({ ...prefs, cursorSize: cursor })}
                    className={`flex-1 text-xs py-2 font-bold rounded-lg border transition-all uppercase ${
                      prefs.cursorSize === cursor
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border text-foreground hover:bg-primary-soft/10"
                    }`}
                  >
                    {cursor}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-3">
              <ToggleButton
                label="High Contrast"
                description="High contrast colors"
                isActive={prefs.highContrast}
                onClick={() => savePrefs({ ...prefs, highContrast: !prefs.highContrast })}
                icon={<Contrast className="h-4 w-4" />}
              />

              <ToggleButton
                label="Invert Colors"
                description="Invert color palette"
                isActive={prefs.invertColors}
                onClick={() => savePrefs({ ...prefs, invertColors: !prefs.invertColors })}
                icon={<Contrast className="h-4 w-4 rotate-180" />}
              />

              <ToggleButton
                label="Highlight Links"
                description="Highlight page links"
                isActive={prefs.highlightLinks}
                onClick={() => savePrefs({ ...prefs, highlightLinks: !prefs.highlightLinks })}
                icon={<LinkIcon className="h-4 w-4" />}
              />

              <ToggleButton
                label="Dyslexia Friendly"
                description="Dyslexia accessible font"
                isActive={prefs.dyslexiaFriendly}
                onClick={() => savePrefs({ ...prefs, dyslexiaFriendly: !prefs.dyslexiaFriendly })}
                icon={<HelpCircle className="h-4 w-4" />}
              />

              <ToggleButton
                label="ADHD Mode"
                description="Reading focus guide"
                isActive={prefs.adhdMode}
                onClick={() => savePrefs({ ...prefs, adhdMode: !prefs.adhdMode })}
                icon={<Eye className="h-4 w-4" />}
              />

              <ToggleButton
                label="Hide Images"
                description="Mask non-essential images"
                isActive={prefs.hideImages}
                onClick={() => savePrefs({ ...prefs, hideImages: !prefs.hideImages })}
                icon={<EyeOff className="h-4 w-4" />}
              />

              <ToggleButton
                label="Pause Animations"
                description="Suppress app transitions"
                isActive={prefs.pauseAnimations}
                onClick={() => savePrefs({ ...prefs, pauseAnimations: !prefs.pauseAnimations })}
                icon={<Square className="h-4 w-4" />}
              />
            </div>

            {/* ADHD Mode sub-controls */}
            {prefs.adhdMode && (
              <div className="mt-4 p-4 bg-muted/40 rounded-xl border border-primary/20 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5 border-b pb-1.5">
                  <Eye className="h-4 w-4" />
                  ADHD Focus Mode Settings
                </div>

                {/* Reading Band Size */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase">
                    Reading Band Height
                  </div>
                  <div className="flex gap-2">
                    {(["small", "medium", "large"] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => savePrefs({ ...prefs, adhdBandHeight: size })}
                        className={`flex-1 text-xs py-2 font-bold rounded-lg border capitalize transition-all ${
                          prefs.adhdBandHeight === size
                            ? "bg-primary border-primary text-primary-foreground"
                            : "bg-background border-border text-foreground hover:bg-primary-soft/10"
                        }`}
                      >
                        {size === "small"
                          ? "Small (80px)"
                          : size === "large"
                            ? "Large (220px)"
                            : "Medium (150px)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reading Sub Options */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      savePrefs({ ...prefs, adhdHighlightParagraph: !prefs.adhdHighlightParagraph })
                    }
                    className={`text-xs py-2 px-3 font-bold rounded-lg border text-center transition-all ${
                      prefs.adhdHighlightParagraph
                        ? "bg-primary border-primary text-primary-foreground shadow-soft"
                        : "bg-background border-border text-muted-foreground hover:bg-primary-soft/10"
                    }`}
                  >
                    Highlight Paragraph
                  </button>

                  <button
                    onClick={() => savePrefs({ ...prefs, adhdReadingLine: !prefs.adhdReadingLine })}
                    className={`text-xs py-2 px-3 font-bold rounded-lg border text-center transition-all ${
                      prefs.adhdReadingLine
                        ? "bg-primary border-primary text-primary-foreground shadow-soft"
                        : "bg-background border-border text-muted-foreground hover:bg-primary-soft/10"
                    }`}
                  >
                    Reading Guide Line
                  </button>
                </div>

                {/* Reset ADHD Settings */}
                <button
                  onClick={() =>
                    savePrefs({
                      ...prefs,
                      adhdBandHeight: "medium",
                      adhdHighlightParagraph: false,
                      adhdReadingLine: false,
                    })
                  }
                  className="w-full text-center text-xs font-bold text-destructive hover:underline pt-1 flex items-center justify-center gap-1 bg-transparent border-0 cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset ADHD Settings
                </button>
              </div>
            )}

            {/* Text-To-Speech Engine */}
            <div className="space-y-3 bg-muted/30 p-4 rounded-xl border">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Text To Speech
              </div>
              <div className="flex gap-2">
                <button
                  onClick={playSpeech}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 active:scale-95 transition-all"
                >
                  <Play className="h-3.5 w-3.5" />
                  Play
                </button>
                <button
                  onClick={pauseSpeech}
                  disabled={!isPlaying}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-all"
                >
                  <Pause className="h-3.5 w-3.5" />
                  Pause
                </button>
                <button
                  onClick={stopSpeech}
                  disabled={!isPlaying && !isPaused}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 disabled:opacity-50 disabled:pointer-events-none active:scale-95 transition-all"
                >
                  <Square className="h-3.5 w-3.5" />
                  Stop
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                Reads highlighted selection or parses document content aloud using SpeechSynthesis.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border flex items-center justify-between bg-muted/20">
            <button
              onClick={resetAll}
              className="flex items-center gap-2 border border-border bg-background text-foreground text-xs font-semibold px-3 py-2 rounded-lg hover:bg-primary-soft/10 hover:border-primary transition-colors active:scale-95"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Accessibility Settings
            </button>
            <span className="text-[10px] font-semibold text-muted-foreground">RailAssist HQ</span>
          </div>
        </div>
      )}

      {/* ADHD Reading Guide Line Overlay */}
      {prefs.adhdMode && (
        <>
          <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden print:hidden">
            {/* Dimmed top overlay */}
            <div
              className="absolute inset-x-0 top-0 bg-black/35 transition-all duration-75"
              style={{
                height: `${mouseY - (prefs.adhdBandHeight === "small" ? 40 : prefs.adhdBandHeight === "large" ? 110 : 75)}px`,
              }}
            />
            {/* Focus strip border outline */}
            <div
              className="absolute inset-x-0 border-y border-yellow-400/40 bg-transparent transition-all duration-75"
              style={{
                top: `${mouseY - (prefs.adhdBandHeight === "small" ? 40 : prefs.adhdBandHeight === "large" ? 110 : 75)}px`,
                height: `${prefs.adhdBandHeight === "small" ? 80 : prefs.adhdBandHeight === "large" ? 220 : 150}px`,
              }}
            />
            {/* Dimmed bottom overlay */}
            <div
              className="absolute inset-x-0 bottom-0 bg-black/35 transition-all duration-75"
              style={{
                top: `${mouseY + (prefs.adhdBandHeight === "small" ? 40 : prefs.adhdBandHeight === "large" ? 110 : 75)}px`,
              }}
            />
          </div>

          {/* Reading Guide Line */}
          {prefs.adhdReadingLine && (
            <div
              className="pointer-events-none fixed left-0 right-0 z-[9999] border-t-2 border-yellow-400/80 shadow-[0_0_6px_rgba(250,204,21,0.5)] transition-all duration-75 print:hidden"
              style={{ top: `${mouseY}px` }}
            />
          )}
        </>
      )}
    </>
  );
}

function ToggleButton({
  label,
  description,
  isActive,
  onClick,
  icon,
}: {
  label: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 text-center rounded-xl border transition-all active:scale-95 ${
        isActive
          ? "bg-primary/10 border-primary text-primary shadow-soft"
          : "bg-background border-border text-foreground hover:bg-primary-soft/10 hover:border-primary/30"
      }`}
      aria-pressed={isActive}
    >
      <div
        className={`p-1.5 rounded-lg mb-1.5 ${isActive ? "bg-primary text-primary-foreground" : "bg-muted/40"}`}
      >
        {icon}
      </div>
      <span className="text-xs font-bold">{label}</span>
      <span className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{description}</span>
    </button>
  );
}
