"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type UploadStatus = "idle" | "uploading" | "done" | "error";

function urlFolder(url: string): string {
  const m = url.match(/\/images\/([^/]+)\//);
  return m ? m[1] : "media";
}

function urlName(url: string): string {
  const n = decodeURIComponent(url.split("/").pop() ?? "");
  return n.slice(0, 24) + (n.length > 24 ? "…" : "");
}

export function MediaPicker({
  name,
  value,
  placeholder,
  allowClear = true,
  folders,
}: {
  name: string;
  value: string;
  placeholder?: string;
  allowClear?: boolean;
  folders?: string[];
}) {
  const [open, setOpen] = useState(false);
  const [library, setLibrary] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(value);

  const folderList = useMemo(
    () => folders ?? ["media", "profile", "hero", "portfolio", "services", "og"],
    [folders]
  );

  useEffect(() => setCurrent(value), [value]);

  const loadLibrary = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/media/list");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to load images");
      setLibrary(json.folders ?? {});
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load images");
    } finally {
      setLoading(false);
    }
  }, []);

  function openModal() {
    setOpen(true);
    setError("");
    loadLibrary();
  }

  async function handleUpload(file: File | undefined) {
    if (!file) return;
    setStatus("uploading");
    setError("");
    const body = new FormData();
    body.append("file", file);
    body.append("folder", urlFolder(current) || "media");

    try {
      const res = await fetch("/api/media/upload", { method: "POST", body });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setCurrent(json.url);
      setStatus("done");
      loadLibrary();
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Upload failed");
    }
  }

  const allUrls = useMemo(
    () => Object.values(library).flat(),
    [library]
  );

  return (
    <>
      <input type="hidden" name={name} value={current} />

      <div className="flex items-center gap-2">
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder={placeholder ?? "https://…"}
        />
        <button
          type="button"
          onClick={openModal}
          title="Browse media library"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md bg-accent px-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
        >
          <i className="bi bi-images" />
          <span className="hidden sm:inline">Browse</span>
        </button>
      </div>

      {current ? (
        <div className="mt-2 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current}
            alt="Preview"
            className="h-14 w-20 rounded border border-gray-200 bg-gray-50 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-gray-500">{current}</p>
            {allowClear && (
              <button
                type="button"
                onClick={() => setCurrent("")}
                className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-red-600 transition hover:text-red-700"
              >
                <i className="bi bi-x-circle" /> Clear
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="mt-1 text-xs text-gray-400">No image selected.</p>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h3 className="text-base font-semibold text-gray-900">
                Media library
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <div className="border-b border-gray-200 px-5 py-3">
              <label className="block text-[13px] font-medium text-gray-700">
                Upload new image
              </label>
              <div className="mt-1.5 flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                  onChange={(e) => handleUpload(e.target.files?.[0])}
                  disabled={status === "uploading"}
                  className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-white disabled:opacity-60"
                />
                {status === "uploading" && (
                  <span className="shrink-0 text-sm text-gray-500">
                    Uploading…
                  </span>
                )}
                {status === "done" && (
                  <span className="shrink-0 text-sm font-medium text-green-600">
                    Uploaded ✓
                  </span>
                )}
              </div>
              {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              {loading ? (
                <div className="flex items-center justify-center py-10 text-sm text-gray-400">
                  <i className="bi bi-arrow-repeat mr-2 animate-spin" /> Loading…
                </div>
              ) : allUrls.length === 0 ? (
                <p className="py-10 text-center text-sm text-gray-400">
                  No images yet. Upload one above.
                </p>
              ) : (
                <div>
                  {folderList.map((folder) => {
                    const urls = library[folder] ?? [];
                    if (urls.length === 0) return null;
                    return (
                      <div key={folder} className="mb-5">
                        <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          <i className="bi bi-folder2-open" /> {folder}
                        </h4>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                          {urls.map((url) => (
                            <button
                              key={url}
                              type="button"
                              onClick={() => {
                                setCurrent(url);
                                setOpen(false);
                              }}
                              title={url}
                              className={cn(
                                "group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded border transition",
                                url === current
                                  ? "border-accent ring-2 ring-accent/40"
                                  : "border-gray-200 hover:border-accent"
                              )}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={url}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                              <span className="pointer-events-none absolute inset-x-0 bottom-0 truncate bg-black/50 px-1 py-0.5 text-[10px] text-white">
                                {urlName(url)}
                              </span>
                              {url === current && (
                                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] text-white">
                                  <i className="bi bi-check-lg" />
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}