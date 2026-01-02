"use client";

import React from "react";
import { GUESTS } from "@/data/data-khach";
import { Copy, MessageSquare, RotateCcw, Search } from "lucide-react";

export const LinkGenerator = () => {
  const baseUrl = "https://nanhvduc.ductv.dev/?name=";

  const [q, setQ] = React.useState("");
  const [toast, setToast] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return GUESTS;
    return GUESTS.filter(
      (g) =>
        g.name.toLowerCase().includes(s) || g.slug.toLowerCase().includes(s)
    );
  }, [q]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1200);
  };

  const copy = async (text: string, msg: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    showToast(msg);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Link gửi khách
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Bấm link để mở • Copy để gửi nhanh
          </p>
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo tên hoặc slug…"
              className="w-full rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-300"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            <span className="text-xs text-gray-600">
              {filtered.length}/{GUESTS.length} khách
            </span>
            <button
              onClick={() => {
                setQ("");
                showToast("Đã reset bộ lọc");
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Header row (ẩn trên mobile) */}
          <div className="hidden sm:grid grid-cols-12 gap-3 border-b border-gray-100 px-4 py-3 text-xs font-medium text-gray-500">
            <div className="col-span-4">Tên khách</div>
            <div className="col-span-6">Link</div>
            <div className="col-span-2 text-right">Thao tác</div>
          </div>

          <div className="divide-y divide-gray-100">
            {filtered.map((guest) => {
              const url = `${baseUrl}${encodeURIComponent(guest.slug)}`;
              const msg = `Thân mời ${guest.name} ❤️\nMời bạn xem thiệp cưới tại: ${url}`;

              return (
                <div key={guest.id} className="px-4 py-3 hover:bg-gray-50">
                  {/* Mobile: dọc | Desktop: grid */}
                  <div className="flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:gap-3 sm:items-center">
                    {/* Name */}
                    <div className="sm:col-span-4 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {guest.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {guest.slug}
                      </div>
                    </div>

                    {/* Link (mobile cho xuống dòng) */}
                    <div className="sm:col-span-6 min-w-0">
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-600 hover:underline underline-offset-2 break-words"
                        title={url}
                      >
                        {url}
                      </a>
                    </div>

                    {/* Actions */}
                    <div className="sm:col-span-2 flex items-center sm:justify-end gap-2">
                      <button
                        onClick={() => copy(url, "Đã copy link")}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                        title="Copy link"
                      >
                        <Copy size={14} />
                        Copy
                      </button>

                      <button
                        onClick={() => copy(msg, "Đã copy tin nhắn")}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white hover:bg-gray-800"
                        title="Copy tin nhắn gửi khách"
                      >
                        <MessageSquare size={14} />
                        Msg
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="px-4 py-10 text-center text-sm text-gray-500">
                Không tìm thấy kết quả phù hợp.
              </div>
            )}
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-4 right-4 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
};
