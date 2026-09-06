"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "uploading" | "done" | "error";

export function MediaManager({
  folders,
  initial,
}: {
  folders: string[];
  initial: Record<string, string[]>;
}) {
  const router = useRouter();
  const [folder, setFolder] = useState(folders[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  async function handleChange(file: File | undefined) {
    if (!file) return;
    setStatus("uploading");
    setError("");
    const body = new FormData();
    body.append("file", file);
    body.append("folder", folder);

    try {
      const res = await fetch("/api/media/upload", { method: "POST", body });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setStatus("done");
      router.refresh();
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Upload failed");
    }
  }

  async function copy(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      setError("Could not copy to clipboard.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4 rounded-md border border-dashed border-gray-300 p-4">
        <div className="space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-700">
            Upload folder
          </label>
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            {folders.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 space-y-1.5">
          <label className="block text-[13px] font-medium text-gray-700">
            Image file
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            onChange={(e) => handleChange(e.target.files?.[0])}
            disabled={status === "uploading"}
            className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white disabled:opacity-60"
          />
        </div>
        {status === "uploading" && (
          <span className="text-sm text-gray-500">Uploading…</span>
        )}
        {status === "done" && (
          <span className="text-sm font-medium text-green-600">Uploaded ✓</span>
        )}
        {status === "error" && (
          <span className="text-sm font-medium text-red-600">{error}</span>
        )}
      </div>

      {folders.map((f) => (
        <div key={f}>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <i className="bi bi-folder2-open text-accent" /> {f}
            <span className="text-xs font-normal text-gray-400">
              {initial[f].length} file(s)
            </span>
          </h3>
          {initial[f].length === 0 ? (
            <p className="text-xs text-gray-400">Empty folder.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {initial[f].map((url) => (
                <div
                  key={url}
                  className="group overflow-hidden rounded-md border border-gray-200"
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-gray-50 p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt=""
                      className="h-full max-h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 px-2 py-1.5">
                    <span className="truncate text-[11px] text-gray-500" title={url}>
                      {decodeURIComponent(url.split("/").pop() ?? "")}
                    </span>
                    <button
                      type="button"
                      onClick={() => copy(url)}
                      className="shrink-0 text-xs font-medium text-accent hover:text-accent-dark"
                    >
                      <i className="bi bi-clipboard" />
                      {copied === url ? " Copied" : " Copy"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}