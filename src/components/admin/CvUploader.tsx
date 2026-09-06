"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type UploadStatus = "idle" | "uploading" | "done" | "error";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function fileName(url: string): string {
  const name = decodeURIComponent(url.split("/").pop() ?? "");
  return name || url;
}

function validate(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only PDF, DOC and DOCX files are allowed.";
  }
  if (file.size > MAX_SIZE) {
    return "File must be under 10MB.";
  }
  return null;
}

export function CvUploader({
  name = "cv_url",
  value,
}: {
  name?: string;
  value: string;
}) {
  const [current, setCurrent] = useState(value);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState("");

  useEffect(() => setCurrent(value), [value]);

  async function handleUpload(file: File | undefined) {
    if (!file) return;
    const problem = validate(file);
    if (problem) {
      setStatus("error");
      setError(problem);
      return;
    }
    setStatus("uploading");
    setError("");
    const body = new FormData();
    body.append("file", file);
    try {
      const res = await fetch("/api/cv/upload", { method: "POST", body });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setCurrent(json.url);
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Upload failed");
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={current} />

      <div className="flex items-center gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white transition hover:bg-accent-dark">
          <i className="bi bi-upload" />
          Upload CV
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => handleUpload(e.target.files?.[0])}
            disabled={status === "uploading"}
            className="hidden"
          />
        </label>
        {status === "uploading" && (
          <span className="text-sm text-gray-500">Uploading…</span>
        )}
        {status === "done" && (
          <span className="text-sm font-medium text-green-600">
            Uploaded ✓
          </span>
        )}
      </div>

      {current ? (
        <div className="mt-2 flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-2">
          <i className="bi bi-file-earmark-pdf text-lg text-accent" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-700">
              {fileName(current)}
            </p>
            <p className="truncate text-xs text-gray-400">{current}</p>
          </div>
          <a
            href={current}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 transition hover:text-accent"
          >
            <i className="bi bi-box-arrow-up-right" />
          </a>
          <button
            type="button"
            onClick={() => {
              setCurrent("");
              setError("");
              setStatus("idle");
            }}
            title="Remove CV"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white text-red-600 transition hover:bg-red-50"
          >
            <i className="bi bi-trash" />
          </button>
        </div>
      ) : (
        <p className="mt-1 text-xs text-gray-400">
          No CV uploaded. Visitors will see a disabled download button until a
          file is added.
        </p>
      )}

      {status === "error" && error && (
        <p
          className={cn(
            "mt-1 text-[13px]",
            status === "error" ? "text-red-600" : "text-green-600"
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
}