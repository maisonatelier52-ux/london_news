// app/admin/pages/page.jsx — FULL UPDATED VERSION (responsive block builder)
"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiAlertCircle,
  FiEye, FiSearch, FiLayout,
  FiMove, FiType, FiImage, FiAlignLeft, FiList, FiHelpCircle,
  FiSend, FiColumns, FiArrowUp, FiArrowDown, FiCalendar,
  FiUpload,
} from "react-icons/fi";
import { pagesAdminAPI } from "@/services/adminAPI";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Link from "next/link";

// ─── Constants ────────────────────────────────────────────────────────────────

const TEMPLATE_OPTIONS = [
  { value: "custom",  label: "Custom (Block Builder)", icon: "📝" },
  { value: "about",   label: "About Us",               icon: "📖" },
  { value: "team",    label: "Our Team",               icon: "👥" },
  { value: "contact", label: "Contact",                icon: "📞" },
  { value: "policy",  label: "Policy / Legal",         icon: "⚖️" },
  { value: "careers", label: "Careers",                icon: "💼" },
  { value: "landing", label: "Landing Page",           icon: "🎯" },
];

const BLOCK_TYPES = [
  { value: "hero",       label: "Hero Section", icon: FiLayout,    description: "Full-width hero with title, subtitle, and CTA" },
  { value: "heading",    label: "Heading",       icon: FiType,      description: "H1, H2, or H3 heading" },
  { value: "paragraph",  label: "Paragraph",     icon: FiAlignLeft, description: "Text paragraph" },
  { value: "image",      label: "Image",         icon: FiImage,     description: "Single image with caption" },
  { value: "pullquote",  label: "Pull Quote",    icon: FiAlignLeft, description: "Highlighted quote" },
  { value: "list",       label: "List",          icon: FiList,      description: "Bulleted or numbered list" },
  { value: "faq",        label: "FAQ Section",   icon: FiHelpCircle,description: "Frequently asked questions" },
  { value: "cta",        label: "Call to Action",icon: FiSend,      description: "Promotional banner with button" },
  { value: "two_column", label: "Two Columns",   icon: FiColumns,   description: "Side-by-side content" },
  { value: "spacer",     label: "Spacer",        icon: FiMove,      description: "Vertical spacing" },
];

// ─── Policy nav links ─────────────────────────────────────────────────────────

function getNavLinksForTemplate(slug) {
  if (!slug?.trim()) return [];
  const templates = {
    "advertising-policy":   [{ id:"editorial-separation",label:"Editorial Separation"},{ id:"how-labeled",label:"How Paid Material is Labeled"},{ id:"native-content",label:"Native & Partner Content"},{ id:"affiliate-links",label:"Affiliate Links & Commerce"},{ id:"newsletters-social",label:"Newsletters & Social"},{ id:"political-ads",label:"Political Advertising"},{ id:"practices-avoided",label:"Practices We Avoid"},{ id:"complaints",label:"Questions & Complaints"}],
    "corrections-policy":   [{ id:"how-we-handle",label:"How We Handle Mistakes"},{ id:"where-corrections",label:"Where Corrections Appear"},{ id:"what-correction-includes",label:"What A Correction Includes"},{ id:"reader-submissions",label:"Reader Submissions"},{ id:"commitment-transparency",label:"Our Commitment To Transparency"},{ id:"why-this-matters",label:"Why This Matters"}],
    "editorial-policy":     [{ id:"editorial-independence",label:"Editorial Independence"},{ id:"accuracy-verification",label:"Accuracy & Verification"},{ id:"fairness-balance",label:"Fairness & Balance"},{ id:"transparency",label:"Transparency"},{ id:"disclosure-labeling",label:"Disclosure & Labeling"},{ id:"ethical-standards",label:"Ethical Standards"},{ id:"reader-feedback",label:"Reader Feedback"},{ id:"our-commitment",label:"Our Commitment"}],
    "privacy-policy":       [{ id:"information-we-collect",label:"Information We Collect"},{ id:"how-used",label:"How Information Is Used"},{ id:"cookies",label:"Cookies & Analytics"},{ id:"your-rights",label:"Your Rights & Choices"},{ id:"data-protection",label:"Data Protection"}],
    "right-of-reply":       [{ id:"when-we-seek",label:"When We Seek a Response"},{ id:"how-outreach",label:"How Outreach Is Handled"},{ id:"what-to-send",label:"What to Send Us"},{ id:"post-publication",label:"Post-Publication Responses"},{ id:"what-not-guaranteed",label:"What This Policy Does Not Guarantee"},{ id:"urgent-matters",label:"Urgent & Legal Matters"}],
    "source-methodology":   [{ id:"how-reporting-begins",label:"How Reporting Begins"},{ id:"source-hierarchy",label:"Source Hierarchy & Verification"},{ id:"anonymous-sources",label:"Anonymous Sources"},{ id:"documents-data",label:"Documents, Media & Data"},{ id:"attribution",label:"Attribution & Source Notes"},{ id:"uncertainty",label:"Handling Uncertainty"},{ id:"what-this-policy-excludes",label:"What This Policy Excludes"}],
    "ownership-and-funding":[{ id:"what-this-covers",label:"What This Page Covers"},{ id:"editorial-control",label:"Editorial Control"},{ id:"how-funded",label:"How London News is Funded"},{ id:"conflicts",label:"Conflicts of Interest"},{ id:"commercial-separation",label:"Commercial Separation"},{ id:"political-influence",label:"Political & Advocacy Influence"},{ id:"ownership-changes",label:"Ownership Changes"}],
    "legal":                [{ id:"informational-use",label:"Informational Use of Content"},{ id:"copyright-reuse",label:"Copyright, Quotation & Reuse"},{ id:"complaints-accuracy",label:"Complaints About Accuracy"},{ id:"formal-request",label:"What to Include in a Formal Request"},{ id:"removal-requests",label:"Removal & Update Requests"},{ id:"third-party-links",label:"Links to Third-Party Material"},{ id:"formal-notices",label:"Formal Notices & Requests"}],
    "terms-and-conditions": [{ id:"using-our-content",label:"Using Our Content"},{ id:"accuracy-updates",label:"Accuracy & Updates"},{ id:"opinion-analysis",label:"Opinion & Analysis"},{ id:"external-links",label:"External Links"},{ id:"limitation",label:"Limitation of Responsibility"},{ id:"reader-contributions",label:"Reader Contributions"},{ id:"updates-to-terms",label:"Updates to These Terms"}],
  };
  return templates[slug] || [];
}

// ─── Empty form ───────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  title: "", slug: "", template: "custom",
  seoTitle: "", seoDescription: "", ogImage: "",
  heroImage: "", heroImageAlt: "", heroTitle: "", heroSubtitle: "",
  missionStatement: "", foundingDate: "",
  contactEmail: "", contactPhone: "", contactAddress: "",
  contactFormEnabled: true, contactFormTitle: "Send Us a Message", contactFormDescription: "",
  contactIntroTitle: "Have a story tip, press inquiry, correction, or general question? We'd love to hear from you.",
  contactIntroText: "Our newsroom is based in London and our journalists are working around the clock to bring you the news that matters across the capital.",
  contactOfficeTitle: "Our Office",
  contactOfficeAddress: "London News\n1 London Bridge Street\nLondon, SE1 9GF\nUnited Kingdom",
  contactEmailTitle: "General Inquiries", contactPhoneTitle: "Phone",
  contactHoursTitle: "Newsroom Hours",
  contactHoursText: "24/7 — Our newsroom never sleeps.\nTips and messages are monitored around the clock.",
  contactTypesTitle: "What You Can Contact Us About",
  contactTypes: [
    { icon:"📰", title:"News Tips",        description:"Share information or story leads with our journalists.", order:0 },
    { icon:"✏️", title:"Corrections",      description:"Help us keep our reporting accurate and up to date.",   order:1 },
    { icon:"📺", title:"Press & Media",    description:"Media inquiries and interview requests.",               order:2 },
    { icon:"💬", title:"General Feedback", description:"Your feedback helps us improve.",                       order:3 },
  ],
  newsletterTitle: "Stay Ahead of London",
  newsletterDescription: "Get the latest news, analysis, and stories delivered straight to your inbox.",
  newsletterButtonText: "Subscribe", newsletterSuccessText: "Successfully subscribed! Check your inbox.",
  jobsList: [], blocks: [], policyContent: {}, navLinks: [],
  lastUpdated: new Date().toISOString(), isPublished: true,
};

// ─── WebP image picker ────────────────────────────────────────────────────────

function WebpImagePicker({ preview, onChange, label = "Upload image", hint = "WebP · max 100 KB" }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setError("");
    if (f.type !== "image/webp") { setError("Only .webp files are allowed."); e.target.value = ""; return; }
    if (f.size > 100 * 1024) { setError(`File is ${Math.round(f.size / 1024)} KB — must be under 100 KB.`); e.target.value = ""; return; }
    const reader = new FileReader();
    reader.onloadend = () => onChange({ file: f, preview: reader.result });
    reader.readAsDataURL(f);
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <label className="flex-1 cursor-pointer">
          <div className="border-2 border-dashed border-gray-700 hover:border-[#F5C645] rounded-xl p-3 text-center transition-all bg-black/20">
            <FiUpload className="mx-auto text-gray-500 mb-1" size={18} />
            <p className="text-gray-400 text-xs">{preview ? "Replace image" : label}</p>
            <p className="text-gray-600 text-xs mt-0.5">{hint}</p>
          </div>
          <input ref={inputRef} type="file" accept=".webp,image/webp" onChange={handleFile} className="hidden" />
        </label>
        {preview && (
          <div className="relative shrink-0">
            <img src={preview} alt="preview" className="w-20 h-16 rounded-lg object-cover border border-gray-700" />
            <button
              type="button"
              onClick={() => { onChange({ file: null, preview: "" }); if (inputRef.current) inputRef.current.value = ""; }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
            >
              <FiX size={9} />
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ─── Live Preview panel ───────────────────────────────────────────────────────

function PagePreview({ blocks, isMobile = false }) {
  const containerStyle = isMobile
    ? {
        width: "100%",
        background: "#080808",
        border: "0.5px solid #1f1f1f",
        borderRadius: 10,
        overflow: "hidden",
      }
    : {
        width: 210,
        flexShrink: 0,
        borderLeft: "0.5px solid #1f1f1f",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        alignSelf: "flex-start",
        maxHeight: "560px",
        overflowY: "auto",
      };

  return (
    <div style={containerStyle}>
      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 12px", borderBottom:"0.5px solid #1f1f1f", background:"#080808", position: isMobile ? "static" : "sticky", top:0, zIndex:1 }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:"#F5C645" }} />
        <span style={{ fontSize:10, color:"#555", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase" }}>
          Live preview
        </span>
      </div>

      <div style={{ padding:8 }}>
        <div style={{ background:"#111", borderRadius:6, border:"0.5px solid #1f1f1f", overflow:"hidden" }}>
          <div style={{ background:"#1a1a1a", padding:"5px 8px", display:"flex", alignItems:"center", gap:4, borderBottom:"0.5px solid #222" }}>
            {["#ef4444","#f59e0b","#10b981"].map((c,i) => (
              <div key={i} style={{ width:5, height:5, borderRadius:"50%", background:c }} />
            ))}
            <div style={{ flex:1, marginLeft:6, height:8, background:"#222", borderRadius:10 }} />
          </div>

          <div style={{ background:"#0a0a0a", minHeight: isMobile ? 160 : 220, fontSize:0 }}>
            {blocks.length === 0 ? (
              <div style={{ textAlign:"center", padding:"28px 8px" }}>
                <FiLayout size={18} color="#2a2a2a" style={{ margin:"0 auto 6px" }} />
                <p style={{ color:"#2a2a2a", fontSize:9, lineHeight:1.4 }}>Add blocks to preview</p>
              </div>
            ) : (
              blocks.map((block, i) => (
                <PreviewBlock key={i} block={block} />
              ))
            )}
          </div>
        </div>

        {blocks.length > 0 && (
          <div style={{ marginTop:6, textAlign:"center", fontSize:9, color:"#444" }}>
            {blocks.length} block{blocks.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Preview block renderers ──────────────────────────────────────────────────

function PreviewBlock({ block }) {
  const d = block.data || {};

  switch (block.type) {
    case "hero":
      return (
        <div style={{ position:"relative", overflow:"hidden" }}>
          {d.image
            ? <img src={d.image} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.45 }} />
            : <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#0f0c29,#302b63,#24243e)" }} />
          }
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.55)" }} />
          <div style={{ position:"relative", padding:"14px 10px 12px", textAlign:"center" }}>
            {d.title && <p style={{ fontSize:9, fontWeight:700, color:"#fff", margin:"0 0 3px", lineHeight:1.3 }}>{d.title.length > 40 ? d.title.slice(0,40)+"…" : d.title}</p>}
            {d.subtitle && <p style={{ fontSize:7, color:"rgba(255,255,255,0.65)", margin:"0 0 5px", lineHeight:1.3 }}>{d.subtitle.length > 60 ? d.subtitle.slice(0,60)+"…" : d.subtitle}</p>}
            {d.buttonText && <span style={{ display:"inline-block", background:"#F5C645", color:"#000", fontSize:6, padding:"2px 7px", borderRadius:3, fontWeight:700 }}>{d.buttonText}</span>}
          </div>
        </div>
      );

    case "heading": {
      const lvl = parseInt(d.level) || 2;
      const size = lvl === 1 ? 10 : lvl === 2 ? 8.5 : 7.5;
      return (
        <div style={{ padding:"6px 10px 3px" }}>
          <p style={{ fontSize:size, fontWeight:700, color:"#e8e8e8", margin:0, lineHeight:1.3 }}>{d.text || `H${lvl} Heading`}</p>
        </div>
      );
    }

    case "paragraph":
      return (
        <div style={{ padding:"4px 10px" }}>
          {(d.text || "").split("\n").slice(0,4).map((line, i) => (
            line.trim()
              ? <p key={i} style={{ fontSize:6.5, color:"#9a9a9a", margin:"0 0 2px", lineHeight:1.5 }}>{line.length > 55 ? line.slice(0,55)+"…" : line}</p>
              : <div key={i} style={{ height:4 }} />
          ))}
          {!d.text && [100,88,95,70].map((w,i) => <div key={i} style={{ height:3, background:"#1e1e1e", borderRadius:2, marginBottom:2.5, width:`${w}%` }} />)}
        </div>
      );

    case "image":
      return (
        <div style={{ padding:"4px 10px" }}>
          {d.src
            ? <div style={{ borderRadius:4, overflow:"hidden" }}>
                <img src={d.src} alt={d.alt||""} style={{ width:"100%", height:48, objectFit:"cover", display:"block" }} />
                {d.caption && <p style={{ fontSize:5.5, color:"#555", textAlign:"center", padding:"2px 0", margin:0, background:"#111" }}>{d.caption}</p>}
              </div>
            : <div style={{ height:44, background:"#131313", border:"0.5px solid #222", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
                <FiImage size={12} color="#333" /><span style={{ fontSize:6.5, color:"#333" }}>No image</span>
              </div>
          }
        </div>
      );

    case "pullquote":
      return (
        <div style={{ margin:"4px 10px", borderLeft:"2px solid #F5C645", padding:"4px 7px", background:"rgba(245,198,69,0.04)" }}>
          {d.text
            ? <p style={{ fontSize:7, color:"#ccc", fontStyle:"italic", margin:"0 0 2px", lineHeight:1.4 }}>"{d.text.length > 60 ? d.text.slice(0,60)+"…" : d.text}"</p>
            : [90,75].map((w,i) => <div key={i} style={{ height:2.5, background:"#252525", borderRadius:2, marginBottom:2.5, width:`${w}%` }} />)
          }
          {d.attribution && <p style={{ fontSize:6, color:"#666", margin:0 }}>— {d.attribution}</p>}
        </div>
      );

    case "list":
      return (
        <div style={{ padding:"4px 10px" }}>
          {(d.items || ["Item 1","Item 2","Item 3"]).slice(0,5).map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:4, marginBottom:2.5 }}>
              <span style={{ fontSize:7, color:"#F5C645", lineHeight:1.5, flexShrink:0 }}>{d.ordered ? `${i+1}.` : "•"}</span>
              <span style={{ fontSize:6.5, color:"#9a9a9a", lineHeight:1.5 }}>{String(item).length > 40 ? String(item).slice(0,40)+"…" : String(item)}</span>
            </div>
          ))}
        </div>
      );

    case "faq":
      return (
        <div style={{ padding:"4px 10px" }}>
          {(d.faqs || []).slice(0,4).map((faq, i) => (
            <div key={i} style={{ marginBottom:3, borderBottom:"0.5px solid #1a1a1a", paddingBottom:3 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:4 }}>
                <p style={{ fontSize:6.5, fontWeight:600, color:"#ccc", margin:0, lineHeight:1.4, flex:1 }}>{faq.question?.length > 40 ? faq.question.slice(0,40)+"…" : (faq.question || "Question")}</p>
                <span style={{ fontSize:8, color:"#555", flexShrink:0 }}>+</span>
              </div>
            </div>
          ))}
        </div>
      );

    case "cta":
      return (
        <div style={{ margin:"4px 10px", background:"linear-gradient(135deg,#1a0a2e,#0d0721)", border:"0.5px solid #2d1f4e", borderRadius:5, padding:"10px 8px", textAlign:"center" }}>
          {d.title && <p style={{ fontSize:8, fontWeight:700, color:"#c4b5fd", margin:"0 0 2px" }}>{d.title.length > 28 ? d.title.slice(0,28)+"…" : d.title}</p>}
          {d.subtitle && <p style={{ fontSize:6, color:"#7c6eaf", margin:"0 0 5px" }}>{d.subtitle.length > 40 ? d.subtitle.slice(0,40)+"…" : d.subtitle}</p>}
          {d.buttonText && <span style={{ display:"inline-block", background:"#7c3aed", color:"#fff", fontSize:6.5, padding:"2px 8px", borderRadius:3, fontWeight:600 }}>{d.buttonText}</span>}
        </div>
      );

    case "two_column":
      return (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:3, padding:"4px 10px" }}>
          {[{ title:d.leftTitle, content:d.leftContent }, { title:d.rightTitle, content:d.rightContent }].map((col, i) => (
            <div key={i} style={{ background:"#111", borderRadius:3, padding:"5px 6px", border:"0.5px solid #1e1e1e" }}>
              {col.title && <p style={{ fontSize:7, fontWeight:600, color:"#ddd", margin:"0 0 2px" }}>{col.title.length > 18 ? col.title.slice(0,18)+"…" : col.title}</p>}
              {col.content
                ? <p style={{ fontSize:5.5, color:"#666", margin:0, lineHeight:1.4 }}>{col.content.length > 50 ? col.content.slice(0,50)+"…" : col.content}</p>
                : [100,85,70].map((w,j) => <div key={j} style={{ height:2.5, background:"#1e1e1e", borderRadius:2, marginBottom:2, width:`${w}%` }} />)
              }
            </div>
          ))}
        </div>
      );

    case "spacer": {
      const h = Math.min(Math.max((d.height || 8) * 1.5, 6), 24);
      return <div style={{ height:h, margin:"0 10px", backgroundImage:"repeating-linear-gradient(90deg,#1a1a1a 0px,#1a1a1a 3px,transparent 3px,transparent 7px)", opacity:0.5, borderRadius:2 }} />;
    }

    default:
      return null;
  }
}

// ─── useIsMobile hook ─────────────────────────────────────────────────────────

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

// ─── Block Editor Panel (TOP-LEVEL component — fixes the remount/focus bug) ───
//
// IMPORTANT: This MUST be defined outside PagesPage. When it was a nested
// function inside PagesPage, React treated it as a new component type on every
// render, causing full unmount→remount on each keystroke (losing focus, jumping
// to top of page).

function BlockEditorPanel({
  blocks,
  blockImageFiles,
  formErrors,
  onAddBlock,
  onUpdateBlock,
  onRemoveBlock,
  onMoveBlock,
  onHandleBlockImage,
  onAddFAQ,
  onUpdateFAQ,
  onRemoveFAQ,
  onAddListItem,
  onUpdateListItem,
  onRemoveListItem,
}) {
  return (
    <div className="space-y-4">

      {/* Empty state */}
      {blocks.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed border-gray-800 rounded-xl">
          <FiLayout className="text-gray-700 text-3xl mx-auto mb-2" />
          <p className="text-gray-500 text-sm">No blocks yet.</p>
          <p className="text-gray-600 text-xs mt-1">Click any block type above to start building.</p>
        </div>
      )}

      {/* Block list */}
      {blocks.length > 0 && (
        <div className="space-y-3">
          {blocks.map((block, blockIndex) => {
            const bi   = BLOCK_TYPES.find(b => b.value === block.type);
            const Icon = bi?.icon || FiLayout;
            const blockImg = blockImageFiles[blockIndex];

            return (
              <div key={blockIndex} className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden">
                {/* Block header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-[#F5C645]" />
                    <span className="text-white text-sm font-medium">{bi?.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => onMoveBlock(blockIndex,-1)} disabled={blockIndex===0} className="p-1 text-gray-500 hover:text-white disabled:opacity-30 cursor-pointer"><FiArrowUp size={14}/></button>
                    <button type="button" onClick={() => onMoveBlock(blockIndex,1)} disabled={blockIndex===blocks.length-1} className="p-1 text-gray-500 hover:text-white disabled:opacity-30 cursor-pointer"><FiArrowDown size={14}/></button>
                    <button type="button" onClick={() => onRemoveBlock(blockIndex)} className="p-1 text-red-500 hover:text-red-400 cursor-pointer"><FiTrash2 size={14}/></button>
                  </div>
                </div>

                {/* Block body */}
                <div className="p-4 space-y-3">

                  {block.type==="hero" && (
                    <>
                      <input type="text" value={block.data?.title||""} onChange={e=>onUpdateBlock(blockIndex,{title:e.target.value})} placeholder="Hero Title" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                      <textarea value={block.data?.subtitle||""} onChange={e=>onUpdateBlock(blockIndex,{subtitle:e.target.value})} placeholder="Hero Subtitle" rows={2} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={block.data?.buttonText||""} onChange={e=>onUpdateBlock(blockIndex,{buttonText:e.target.value})} placeholder="Button Text (optional)" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                        <input type="text" value={block.data?.buttonUrl||""} onChange={e=>onUpdateBlock(blockIndex,{buttonUrl:e.target.value})} placeholder="Button URL" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1.5">Hero Background Image <span className="text-gray-600">(WebP · max 100 KB)</span></p>
                        <WebpImagePicker preview={blockImg?.preview || block.data?.image || ""} onChange={({file,preview})=>onHandleBlockImage(blockIndex,{file,preview})} label="Upload hero background"/>
                        <div className="mt-2">
                          <input type="text" value={block.data?.imageAlt||""} onChange={e=>onUpdateBlock(blockIndex,{imageAlt:e.target.value})} placeholder="Image alt text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                        </div>
                      </div>
                    </>
                  )}

                  {block.type==="heading" && (
                    <>
                      <select value={block.data?.level||2} onChange={e=>onUpdateBlock(blockIndex,{level:parseInt(e.target.value)})} className="w-24 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]">
                        <option value={1}>H1</option><option value={2}>H2</option><option value={3}>H3</option>
                      </select>
                      <input type="text" value={block.data?.text||""} onChange={e=>onUpdateBlock(blockIndex,{text:e.target.value})} placeholder="Heading Text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                    </>
                  )}

                  {block.type==="paragraph" && (
                    <textarea value={block.data?.text||""} onChange={e=>onUpdateBlock(blockIndex,{text:e.target.value})} placeholder="Enter your paragraph text..." rows={4} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                  )}

                  {block.type==="image" && (
                    <>
                      <div>
                        <p className="text-gray-400 text-xs mb-1.5">Image <span className="text-gray-600">(WebP · max 100 KB)</span></p>
                        <WebpImagePicker preview={blockImg?.preview || block.data?.src || ""} onChange={({file,preview})=>onHandleBlockImage(blockIndex,{file,preview})} label="Upload image"/>
                      </div>
                      <input type="text" value={block.data?.alt||""} onChange={e=>onUpdateBlock(blockIndex,{alt:e.target.value})} placeholder="Alt Text (for accessibility)" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                      <input type="text" value={block.data?.caption||""} onChange={e=>onUpdateBlock(blockIndex,{caption:e.target.value})} placeholder="Caption (optional)" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                    </>
                  )}

                  {block.type==="pullquote" && (
                    <>
                      <textarea value={block.data?.text||""} onChange={e=>onUpdateBlock(blockIndex,{text:e.target.value})} placeholder="Quote text..." rows={3} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                      <input type="text" value={block.data?.attribution||""} onChange={e=>onUpdateBlock(blockIndex,{attribution:e.target.value})} placeholder="Attribution (e.g., John Doe)" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                    </>
                  )}

                  {block.type==="list" && (
                    <>
                      <label className="flex items-center gap-2"><input type="checkbox" checked={block.data?.ordered||false} onChange={e=>onUpdateBlock(blockIndex,{ordered:e.target.checked})} className="w-4 h-4 rounded"/><span className="text-gray-300 text-sm">Numbered list (ordered)</span></label>
                      <div className="space-y-2">
                        {(block.data?.items||["Item 1","Item 2"]).map((item,ii)=>(
                          <div key={ii} className="flex gap-2">
                            <input type="text" value={item} onChange={e=>onUpdateListItem(blockIndex,ii,e.target.value)} placeholder={`Item ${ii+1}`} className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                            <button type="button" onClick={()=>onRemoveListItem(blockIndex,ii)} className="p-2 text-red-500 hover:bg-red-500/10 rounded"><FiTrash2 size={14}/></button>
                          </div>
                        ))}
                        <button type="button" onClick={()=>onAddListItem(blockIndex)} className="text-sm text-[#F5C645] hover:underline cursor-pointer">+ Add Item</button>
                      </div>
                    </>
                  )}

                  {block.type==="faq" && (
                    <div className="space-y-3">
                      {(block.data?.faqs||[]).map((faq,fi)=>(
                        <div key={fi} className="border border-gray-700 rounded-lg p-3 space-y-2">
                          <div className="flex justify-between"><span className="text-gray-500 text-xs">FAQ #{fi+1}</span><button type="button" onClick={()=>onRemoveFAQ(blockIndex,fi)} className="text-red-500 hover:text-red-400 text-xs">Remove</button></div>
                          <input type="text" value={faq.question||""} onChange={e=>onUpdateFAQ(blockIndex,fi,"question",e.target.value)} placeholder="Question" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                          <textarea value={faq.answer||""} onChange={e=>onUpdateFAQ(blockIndex,fi,"answer",e.target.value)} placeholder="Answer" rows={2} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                        </div>
                      ))}
                      <button type="button" onClick={()=>onAddFAQ(blockIndex)} className="text-sm text-[#F5C645] hover:underline cursor-pointer">+ Add FAQ</button>
                    </div>
                  )}

                  {block.type==="cta" && (
                    <>
                      <input type="text" value={block.data?.title||""} onChange={e=>onUpdateBlock(blockIndex,{title:e.target.value})} placeholder="CTA Title" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                      <textarea value={block.data?.subtitle||""} onChange={e=>onUpdateBlock(blockIndex,{subtitle:e.target.value})} placeholder="CTA Subtitle" rows={2} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" value={block.data?.buttonText||""} onChange={e=>onUpdateBlock(blockIndex,{buttonText:e.target.value})} placeholder="Button Text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                        <input type="text" value={block.data?.buttonUrl||""} onChange={e=>onUpdateBlock(blockIndex,{buttonUrl:e.target.value})} placeholder="Button URL" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                      </div>
                    </>
                  )}

                  {block.type==="two_column" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input type="text" value={block.data?.leftTitle||""} onChange={e=>onUpdateBlock(blockIndex,{leftTitle:e.target.value})} placeholder="Left Column Title" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                        <textarea value={block.data?.leftContent||""} onChange={e=>onUpdateBlock(blockIndex,{leftContent:e.target.value})} placeholder="Left Column Content" rows={4} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] mt-2"/>
                      </div>
                      <div>
                        <input type="text" value={block.data?.rightTitle||""} onChange={e=>onUpdateBlock(blockIndex,{rightTitle:e.target.value})} placeholder="Right Column Title" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                        <textarea value={block.data?.rightContent||""} onChange={e=>onUpdateBlock(blockIndex,{rightContent:e.target.value})} placeholder="Right Column Content" rows={4} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] mt-2"/>
                      </div>
                    </div>
                  )}

                  {block.type==="spacer" && (
                    <div>
                      <label className="block text-gray-300 mb-1 text-sm">Spacer Height (rem)</label>
                      <input type="number" value={block.data?.height||8} onChange={e=>onUpdateBlock(blockIndex,{height:parseInt(e.target.value)||8})} min={1} max={32} className="w-32 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                      <p className="text-gray-500 text-xs mt-1">1rem = 16px. 8rem = 128px spacing.</p>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      )}

      {formErrors.blocks && <p className="text-red-400 text-xs mt-1">{formErrors.blocks}</p>}

      <div>
        <p className="text-gray-400 text-xs font-semibold uppercase mb-3">Add content block</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {BLOCK_TYPES.map(bt => {
            const Icon = bt.icon;
            return (
              <button key={bt.value} type="button" onClick={() => onAddBlock(bt.value)}
                className="flex flex-col items-center gap-1 p-3 bg-gray-900/60 border border-gray-700 rounded-lg hover:border-[#F5C645] hover:bg-gray-800 transition-all cursor-pointer group">
                <Icon size={20} className="text-gray-500 group-hover:text-[#F5C645]" />
                <span className="text-xs text-gray-400 group-hover:text-white text-center leading-tight">{bt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PagesPage() {
  const [pages,            setPages]            = useState([]);
  const [filtered,         setFiltered]         = useState([]);
  const [search,           setSearch]           = useState("");
  const [loading,          setLoading]          = useState(true);
  const [showModal,        setShowModal]        = useState(false);
  const [editingPage,      setEditingPage]      = useState(null);
  const [formData,         setFormData]         = useState(EMPTY_FORM);
  const [heroImageFile,    setHeroImageFile]    = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState("");
  const [blockImageFiles,  setBlockImageFiles]  = useState({});
  const [formErrors,       setFormErrors]       = useState({});
  const [saving,           setSaving]           = useState(false);
  const [confirm,          setConfirm]          = useState({ open:false, id:null, title:"" });
  const [activeTab,        setActiveTab]        = useState("basic");

  const isMobile = useIsMobile();

  useEffect(() => { fetchPages(); }, []);
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(q ? pages.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q) ||
      p.template?.toLowerCase().includes(q)
    ) : pages);
  }, [search, pages]);

  async function fetchPages() {
    try { setLoading(true); const res = await pagesAdminAPI.getAll(); setPages(res.data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  function validate() {
    const errors = {};
    if (!formData.title?.trim())          errors.title          = "Page title is required.";
    if (!formData.slug?.trim())           errors.slug           = "Slug is required.";
    if (!formData.seoTitle?.trim())       errors.seoTitle       = "SEO title is required.";
    if (!formData.seoDescription?.trim()) errors.seoDescription = "SEO description is required.";
    if (formData.template === "custom" && formData.blocks.length === 0)
      errors.blocks = "At least one content block is required for custom pages.";
    if (formData.template === "policy") {
      const navLinks = getNavLinksForTemplate(formData.slug);
      if (navLinks.length === 0 && formData.navLinks.length === 0)
        errors.policy = "No navigation links configured for this policy page.";
    }
    if (formData.template === "careers" && formData.jobsList.length === 0)
      errors.jobs = "At least one job listing is required for careers page.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    if (e?.preventDefault) e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      const fd = new FormData();
      const submitData = { ...formData };
      if (submitData.blocks) submitData.blocks = submitData.blocks.map(({ _id, ...b }) => b);
      delete submitData.heroImage;
      fd.append("data", JSON.stringify(submitData));
      if (heroImageFile) fd.append("profileImage", heroImageFile);
      Object.entries(blockImageFiles).forEach(([idx, { file }]) => {
        if (file) fd.append(`blockImage_${idx}`, file);
      });
      if (editingPage) { await pagesAdminAPI.update(editingPage._id, fd); }
      else             { await pagesAdminAPI.create(fd); }
      await fetchPages();
      closeModal();
    } catch (err) {
      console.error("Save error:", err);
      setFormErrors({ api: err.response?.data?.message || "Failed to save page." });
    } finally { setSaving(false); }
  }

  function openModal(page = null) {
    if (page) {
      setEditingPage(page);
      setFormData({
        title: page.title || "", slug: page.slug || "", template: page.template || "custom",
        seoTitle: page.seoTitle || "", seoDescription: page.seoDescription || "", ogImage: page.ogImage || "",
        heroImage: page.heroImage || "", heroImageAlt: page.heroImageAlt || "",
        heroTitle: page.heroTitle || "", heroSubtitle: page.heroSubtitle || "",
        missionStatement: page.missionStatement || "", foundingDate: page.foundingDate || "",
        contactEmail: page.contactEmail || "", contactPhone: page.contactPhone || "", contactAddress: page.contactAddress || "",
        contactFormEnabled: page.contactFormEnabled !== false,
        contactFormTitle: page.contactFormTitle || "Send Us a Message",
        contactFormDescription: page.contactFormDescription || "",
        contactIntroTitle: page.contactIntroTitle || EMPTY_FORM.contactIntroTitle,
        contactIntroText: page.contactIntroText || EMPTY_FORM.contactIntroText,
        contactOfficeTitle: page.contactOfficeTitle || EMPTY_FORM.contactOfficeTitle,
        contactOfficeAddress: page.contactOfficeAddress || EMPTY_FORM.contactOfficeAddress,
        contactEmailTitle: page.contactEmailTitle || EMPTY_FORM.contactEmailTitle,
        contactPhoneTitle: page.contactPhoneTitle || EMPTY_FORM.contactPhoneTitle,
        contactHoursTitle: page.contactHoursTitle || EMPTY_FORM.contactHoursTitle,
        contactHoursText: page.contactHoursText || EMPTY_FORM.contactHoursText,
        contactTypesTitle: page.contactTypesTitle || EMPTY_FORM.contactTypesTitle,
        contactTypes: page.contactTypes || EMPTY_FORM.contactTypes,
        newsletterTitle: page.newsletterTitle || EMPTY_FORM.newsletterTitle,
        newsletterDescription: page.newsletterDescription || EMPTY_FORM.newsletterDescription,
        newsletterButtonText: page.newsletterButtonText || EMPTY_FORM.newsletterButtonText,
        newsletterSuccessText: page.newsletterSuccessText || EMPTY_FORM.newsletterSuccessText,
        jobsList: page.jobsList || [], blocks: page.blocks || [],
        policyContent: page.policyContent || {},
        navLinks: page.navLinks || getNavLinksForTemplate(page.slug),
        lastUpdated: page.lastUpdated || new Date().toISOString(),
        isPublished: page.isPublished !== false,
      });
      setHeroImagePreview(page.heroImage || "");
      setHeroImageFile(null);
    } else {
      setEditingPage(null);
      setFormData(EMPTY_FORM);
      setHeroImagePreview("");
      setHeroImageFile(null);
    }
    setBlockImageFiles({});
    setFormErrors({});
    setActiveTab("basic");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false); setEditingPage(null);
    setHeroImageFile(null); setHeroImagePreview("");
    setBlockImageFiles({});
    setFormErrors({});
  }

  function handleHeroImage(e) {
    const f = e.target.files[0];
    if (!f) return;
    if (f.type !== "image/webp") { setFormErrors({ ...formErrors, heroImage: "Only .webp format is allowed." }); e.target.value=""; return; }
    if (f.size > 100*1024) { setFormErrors({ ...formErrors, heroImage: `File is ${Math.round(f.size/1024)} KB — must be under 100 KB.` }); e.target.value=""; return; }
    setHeroImageFile(f);
    const r = new FileReader(); r.onloadend = () => setHeroImagePreview(r.result); r.readAsDataURL(f);
    setFormErrors({ ...formErrors, heroImage: "" });
  }

  function handleBlockImage(blockIndex, { file, preview }) {
    setFormData(prev => ({
      ...prev,
      blocks: prev.blocks.map((b, i) => {
        if (i !== blockIndex) return b;
        if (b.type === "hero")  return { ...b, data: { ...b.data, image: preview || "" } };
        if (b.type === "image") return { ...b, data: { ...b.data, src:   preview || "" } };
        return b;
      }),
    }));
    setBlockImageFiles(prev => {
      const next = { ...prev };
      if (file) next[blockIndex] = { file, preview };
      else delete next[blockIndex];
      return next;
    });
  }

  function addBlock(type) {
    setFormData(prev => ({
      ...prev,
      blocks: [...prev.blocks, { type, order: prev.blocks.length, data: getDefaultBlockData(type) }],
    }));
  }

  function getDefaultBlockData(type) {
    switch (type) {
      case "hero":       return { title:"", subtitle:"", buttonText:"", buttonUrl:"", image:"", imageAlt:"" };
      case "heading":    return { level:2, text:"New Heading" };
      case "paragraph":  return { text:"Enter your paragraph text here..." };
      case "image":      return { src:"", alt:"", caption:"" };
      case "pullquote":  return { text:"Quote text here...", attribution:"" };
      case "list":       return { ordered:false, items:["Item 1","Item 2"] };
      case "faq":        return { faqs:[{ question:"Question 1", answer:"Answer 1" }] };
      case "cta":        return { title:"Call to Action", subtitle:"Get started today", buttonText:"Learn More", buttonUrl:"" };
      case "two_column": return { leftTitle:"", leftContent:"", rightTitle:"", rightContent:"" };
      case "spacer":     return { height:8 };
      default:           return {};
    }
  }

  function updateBlock(index, data) {
    setFormData(prev => ({
      ...prev,
      blocks: prev.blocks.map((b,i) => i===index ? { ...b, data:{ ...b.data, ...data } } : b),
    }));
  }

  function removeBlock(index) {
    setFormData(prev => ({ ...prev, blocks: prev.blocks.filter((_,i) => i!==index) }));
    setBlockImageFiles(prev => {
      const next = {};
      Object.entries(prev).forEach(([k, v]) => {
        const ki = parseInt(k);
        if (ki < index) next[ki] = v;
        else if (ki > index) next[ki-1] = v;
      });
      return next;
    });
  }

  function moveBlock(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= formData.blocks.length) return;
    const newBlocks = [...formData.blocks];
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    newBlocks.forEach((b,i) => { b.order = i; });
    setFormData(prev => ({ ...prev, blocks: newBlocks }));
    setBlockImageFiles(prev => {
      const next = { ...prev };
      const a = next[index]; const b = next[newIndex];
      if (a) next[newIndex] = a; else delete next[newIndex];
      if (b) next[index]    = b; else delete next[index];
      return next;
    });
  }

  function addJob()       { setFormData(prev => ({ ...prev, jobsList:[...prev.jobsList,{ title:"", location:"", type:"Full-time", description:"", isActive:true }] })); }
  function updateJob(i,f,v){ setFormData(prev => ({ ...prev, jobsList:prev.jobsList.map((j,idx)=>idx===i?{...j,[f]:v}:j) })); }
  function removeJob(i)   { setFormData(prev => ({ ...prev, jobsList:prev.jobsList.filter((_,idx)=>idx!==i) })); }

  function addFAQ(bi)        { setFormData(prev => ({ ...prev, blocks:prev.blocks.map((b,i)=>i===bi?{...b,data:{...b.data,faqs:[...(b.data.faqs||[]),{question:"",answer:""}]}}:b) })); }
  function updateFAQ(bi,fi,f,v){ setFormData(prev => ({ ...prev, blocks:prev.blocks.map((b,i)=>i===bi?{...b,data:{...b.data,faqs:b.data.faqs.map((faq,j)=>j===fi?{...faq,[f]:v}:faq)}}:b) })); }
  function removeFAQ(bi,fi)  { setFormData(prev => ({ ...prev, blocks:prev.blocks.map((b,i)=>i===bi?{...b,data:{...b.data,faqs:b.data.faqs.filter((_,j)=>j!==fi)}}:b) })); }

  function addListItem(bi)     { setFormData(prev => ({ ...prev, blocks:prev.blocks.map((b,i)=>i===bi?{...b,data:{...b.data,items:[...(b.data.items||[]),"New item"]}}:b) })); }
  function updateListItem(bi,ii,v){ setFormData(prev => ({ ...prev, blocks:prev.blocks.map((b,i)=>i===bi?{...b,data:{...b.data,items:b.data.items.map((it,j)=>j===ii?v:it)}}:b) })); }
  function removeListItem(bi,ii){ setFormData(prev => ({ ...prev, blocks:prev.blocks.map((b,i)=>i===bi?{...b,data:{...b.data,items:b.data.items.filter((_,j)=>j!==ii)}}:b) })); }

  function addContactType()     { setFormData(prev => ({ ...prev, contactTypes:[...(prev.contactTypes||[]),{icon:"📰",title:"",description:"",order:(prev.contactTypes||[]).length}] })); }
  function updateContactType(i,f,v){ setFormData(prev => ({ ...prev, contactTypes:prev.contactTypes.map((t,idx)=>idx===i?{...t,[f]:v}:t) })); }
  function removeContactType(i) { setFormData(prev => ({ ...prev, contactTypes:prev.contactTypes.filter((_,idx)=>idx!==i) })); }

  function updatePolicyContent(id,v){ setFormData(prev => ({ ...prev, policyContent:{ ...prev.policyContent,[id]:v } })); }

  const inp    = "w-full bg-gray-900 border rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors";
  const inpErr = (k) => formErrors[k] ? "border-red-500" : "border-gray-700";
  const policyNavLinks = getNavLinksForTemplate(formData.slug);

  function getTabList() {
    const tabs = [
      { id:"basic",   label:"Basic Info" },
      { id:"seo",     label:"SEO" },
      { id:"content", label:"Content" },
    ];
    if (formData.template === "custom")  tabs.push({ id:"blocks", label:"Block Builder" });
    if (formData.template === "policy")  tabs.push({ id:"policy", label:"Policy Content" });
    if (formData.template === "careers") tabs.push({ id:"jobs",   label:"Job Listings" });
    return tabs;
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div>
      <ConfirmDialog
        isOpen={confirm.open} title="Delete Page"
        message={`Delete "${confirm.title}"? This cannot be undone.`}
        onConfirm={async () => {
          try { await pagesAdminAPI.delete(confirm.id); await fetchPages(); }
          catch (err) { alert(err.response?.data?.message || "Failed to delete."); }
          finally { setConfirm({ open:false, id:null, title:"" }); }
        }}
        onCancel={() => setConfirm({ open:false, id:null, title:"" })}
        confirmText="Delete"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Pages</h1>
          <p className="text-gray-400 mt-1 text-sm">Create and manage static pages with our block builder</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all cursor-pointer font-medium text-sm w-full sm:w-auto">
          <FiPlus size={18} /> Add Page
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search pages by title, slug, or template…" className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-10 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645] transition-colors" />
        {search && <button onClick={()=>setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white cursor-pointer"><FiX size={14}/></button>}
      </div>

      {/* Footer tip */}
      <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-blue-400">📌</span>
          <span className="text-gray-400">Pages created here can be added to footer in</span>
          <Link href="/admin/footer" className="text-[#F5C645] hover:underline">Footer Settings</Link>
          <span className="text-gray-500">→ about, contact, privacy-policy, terms-and-conditions, legal, etc.</span>
        </div>
      </div>

      {/* Pages grid */}
      {loading ? (
        <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#F5C645]" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-gray-900/40 rounded-2xl">
          <FiLayout className="text-gray-600 text-4xl mx-auto mb-3" />
          <p className="text-gray-400 text-sm">{search ? `No pages match "${search}".` : 'No pages yet. Click "Add Page" to create one.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map(page => {
            const ti = TEMPLATE_OPTIONS.find(t=>t.value===page.template) || TEMPLATE_OPTIONS[0];
            return (
              <div key={page._id} className="bg-gradient-to-br from-gray-900 to-black border border-[#F5C645]/20 rounded-2xl p-5 sm:p-6 hover:border-[#F5C645]/40 transition-all duration-300 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl shrink-0">{ti.icon}</span>
                  <h3 className="text-white text-base sm:text-lg font-semibold break-words">{page.title}</h3>
                </div>
                <p className="text-gray-500 text-sm break-words mb-3">/page/{page.slug}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">{ti.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${page.isPublished?'bg-green-500/20 text-green-400':'bg-gray-700/40 text-gray-400'}`}>{page.isPublished?'Published':'Draft'}</span>
                  {page.template==="custom"&&page.blocks?.length>0&&<span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">{page.blocks.length} blocks</span>}
                  {page.template==="policy"&&Object.keys(page.policyContent||{}).length>0&&<span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full">{Object.keys(page.policyContent).length} sections</span>}
                </div>
                <div className="flex-1" />
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-800 mt-2">
                  <Link href={`/page/${page.slug}`} target="_blank">
                    <button className="p-1.5 text-green-400 hover:bg-green-400/10 rounded-lg cursor-pointer transition-colors" title="View Page"><FiEye size={16}/></button>
                  </Link>
                  <button onClick={()=>openModal(page)} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg cursor-pointer transition-colors" title="Edit Page"><FiEdit2 size={16}/></button>
                  <button onClick={()=>setConfirm({open:true,id:page._id,title:page.title})} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer transition-colors" title="Delete Page"><FiTrash2 size={16}/></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modal ─────────────────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/85 overflow-y-auto z-50 p-3 sm:p-4">
          <div className="max-w-4xl mx-auto my-4 sm:my-8">
            <div className="bg-[#0d0d0d] border border-[#F5C645]/20 rounded-2xl">

              {/* Modal header */}
              <div className="flex justify-between items-center px-5 sm:px-6 py-4 border-b border-gray-800 bg-[#0d0d0d]/95 backdrop-blur rounded-t-2xl z-10">
                <h2 className="text-white text-lg sm:text-xl font-semibold">{editingPage?"Edit Page":"Add Page"}</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white cursor-pointer p-1"><FiX size={22}/></button>
              </div>

              {/* Tabs */}
              <div className="px-5 sm:px-6 pt-4">
                <div className="flex gap-1 border-b border-gray-800 mb-6 overflow-x-auto">
                  {getTabList().map(tab => (
                    <button key={tab.id} type="button" onClick={()=>setActiveTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab===tab.id?"text-[#F5C645] border-b-2 border-[#F5C645]":"text-gray-500 hover:text-gray-300"}`}>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form body */}
              <form className="px-5 sm:px-6">
                {formErrors.api && (
                  <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
                    <FiAlertCircle size={15} className="shrink-0 mt-0.5"/><span>{formErrors.api}</span>
                  </div>
                )}

                {/* ── Basic Info ─────────────────────────────────────────── */}
                {activeTab==="basic" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-1.5 text-sm">Page Title <span className="text-red-400">*</span></label>
                        <input type="text" value={formData.title} onChange={e=>{const t=e.target.value;setFormData(p=>({...p,title:t,slug:t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}));setFormErrors(p=>({...p,title:""}));}} className={`${inp} ${inpErr("title")}`} placeholder="About Us"/>
                        {formErrors.title&&<p className="text-red-400 text-xs mt-1">{formErrors.title}</p>}
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1.5 text-sm">Slug <span className="text-red-400">*</span></label>
                        <input type="text" value={formData.slug} onChange={e=>{setFormData(p=>({...p,slug:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'')}));setFormErrors(p=>({...p,slug:""}));}} className={`${inp} ${inpErr("slug")}`} placeholder="about-us"/>
                        <p className="text-gray-500 text-xs mt-1">URL: /page/{formData.slug||"page-slug"}</p>
                        {formErrors.slug&&<p className="text-red-400 text-xs mt-1">{formErrors.slug}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">Template</label>
                      <select value={formData.template} onChange={e=>setFormData(p=>({...p,template:e.target.value}))} className={`${inp} cursor-pointer`}>
                        {TEMPLATE_OPTIONS.map(t=><option key={t.value} value={t.value}>{t.icon} {t.label}</option>)}
                      </select>
                      <p className="text-gray-500 text-xs mt-1">
                        {formData.template==="custom"  &&"Build your page using the block builder in the Block Builder tab."}
                        {formData.template==="about"   &&"About Us page with mission, story, and team preview."}
                        {formData.template==="team"    &&"Team page that automatically shows all authors."}
                        {formData.template==="contact" &&"Contact page with form, address, phone, and email."}
                        {formData.template==="policy"  &&"Legal/Policy page with customizable sections."}
                        {formData.template==="careers" &&"Careers page with job listings and application form."}
                        {formData.template==="landing" &&"Landing page with customizable blocks."}
                      </p>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">Published Status</label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.isPublished} onChange={e=>setFormData(p=>({...p,isPublished:e.target.checked}))} className="w-4 h-4 rounded"/>
                        <span className="text-gray-300 text-sm">{formData.isPublished?"Published (visible on site)":"Draft (hidden from public)"}</span>
                      </label>
                    </div>

                    {/* About settings */}
                    {formData.template==="about" && (
                      <div className="space-y-4 border-t border-gray-800 pt-4">
                        <h3 className="text-[#F5C645] font-semibold text-sm">About Page Settings</h3>
                        <div>
                          <label className="block text-gray-300 mb-1.5 text-sm">Mission Statement</label>
                          <textarea value={formData.missionStatement} onChange={e=>setFormData(p=>({...p,missionStatement:e.target.value}))} rows={3} className={inp} placeholder="Our mission is to provide independent, trustworthy news coverage..."/>
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-1.5 text-sm">Founding Date</label>
                          <input type="text" value={formData.foundingDate} onChange={e=>setFormData(p=>({...p,foundingDate:e.target.value}))} className={inp} placeholder="2019"/>
                        </div>
                      </div>
                    )}

                    {/* Contact settings */}
                    {formData.template==="contact" && (
                      <div className="space-y-6 border-t border-gray-800 pt-4">
                        <h3 className="text-[#F5C645] font-semibold text-sm">Contact Page Settings</h3>
                        <div className="space-y-4 p-4 bg-gray-900/40 rounded-xl">
                          <p className="text-gray-400 text-xs font-semibold uppercase">Hero & Intro Section</p>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Intro Title</label><input type="text" value={formData.contactIntroTitle} onChange={e=>setFormData(p=>({...p,contactIntroTitle:e.target.value}))} className={inp}/></div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Intro Text</label><textarea value={formData.contactIntroText} onChange={e=>setFormData(p=>({...p,contactIntroText:e.target.value}))} rows={3} className={inp}/></div>
                        </div>
                        <div className="space-y-4 p-4 bg-gray-900/40 rounded-xl">
                          <p className="text-gray-400 text-xs font-semibold uppercase">Contact Information Cards</p>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Office Section Title</label><input type="text" value={formData.contactOfficeTitle} onChange={e=>setFormData(p=>({...p,contactOfficeTitle:e.target.value}))} className={inp}/></div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Office Address</label><textarea value={formData.contactOfficeAddress} onChange={e=>setFormData(p=>({...p,contactOfficeAddress:e.target.value}))} rows={4} className={inp}/><p className="text-gray-500 text-xs mt-1">Use new lines for each line of the address</p></div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Email Section Title</label><input type="text" value={formData.contactEmailTitle} onChange={e=>setFormData(p=>({...p,contactEmailTitle:e.target.value}))} className={inp}/></div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Email Address</label><input type="email" value={formData.contactEmail} onChange={e=>setFormData(p=>({...p,contactEmail:e.target.value}))} className={inp} placeholder="hello@londonnews.co.uk"/></div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Phone Section Title</label><input type="text" value={formData.contactPhoneTitle} onChange={e=>setFormData(p=>({...p,contactPhoneTitle:e.target.value}))} className={inp}/></div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Phone Number</label><input type="text" value={formData.contactPhone} onChange={e=>setFormData(p=>({...p,contactPhone:e.target.value}))} className={inp} placeholder="+44 20 7946 0958"/></div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Hours Section Title</label><input type="text" value={formData.contactHoursTitle} onChange={e=>setFormData(p=>({...p,contactHoursTitle:e.target.value}))} className={inp}/></div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Hours Text</label><textarea value={formData.contactHoursText} onChange={e=>setFormData(p=>({...p,contactHoursText:e.target.value}))} rows={2} className={inp}/></div>
                        </div>
                        <div className="space-y-4 p-4 bg-gray-900/40 rounded-xl">
                          <div className="flex justify-between items-center">
                            <p className="text-gray-400 text-xs font-semibold uppercase">Contact Types</p>
                            <button type="button" onClick={addContactType} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded hover:bg-blue-500/30">+ Add Type</button>
                          </div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Section Title</label><input type="text" value={formData.contactTypesTitle} onChange={e=>setFormData(p=>({...p,contactTypesTitle:e.target.value}))} className={inp}/></div>
                          {(formData.contactTypes||[]).map((ct,idx)=>(
                            <div key={idx} className="border border-gray-700 rounded-lg p-3 space-y-2">
                              <div className="flex justify-between"><span className="text-gray-500 text-xs">Type #{idx+1}</span><button type="button" onClick={()=>removeContactType(idx)} className="text-red-400 text-xs">Remove</button></div>
                              <div className="grid grid-cols-2 gap-2">
                                <div><label className="block text-gray-400 text-xs mb-1">Icon (emoji)</label><input type="text" value={ct.icon||"📰"} onChange={e=>updateContactType(idx,"icon",e.target.value)} className={inp} placeholder="📰"/></div>
                                <div><label className="block text-gray-400 text-xs mb-1">Title</label><input type="text" value={ct.title||""} onChange={e=>updateContactType(idx,"title",e.target.value)} className={inp} placeholder="News Tips"/></div>
                              </div>
                              <div><label className="block text-gray-400 text-xs mb-1">Description</label><textarea value={ct.description||""} onChange={e=>updateContactType(idx,"description",e.target.value)} rows={2} className={inp} placeholder="Share information or story leads with our journalists."/></div>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4 p-4 bg-gray-900/40 rounded-xl">
                          <p className="text-gray-400 text-xs font-semibold uppercase">Contact Form Settings</p>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Form Title</label><input type="text" value={formData.contactFormTitle} onChange={e=>setFormData(p=>({...p,contactFormTitle:e.target.value}))} className={inp}/></div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Form Description</label><textarea value={formData.contactFormDescription} onChange={e=>setFormData(p=>({...p,contactFormDescription:e.target.value}))} rows={2} className={inp}/></div>
                          <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={formData.contactFormEnabled!==false} onChange={e=>setFormData(p=>({...p,contactFormEnabled:e.target.checked}))} className="w-4 h-4 rounded"/><span className="text-gray-300 text-sm">Enable contact form</span></label>
                        </div>
                        <div className="space-y-4 p-4 bg-gray-900/40 rounded-xl">
                          <p className="text-gray-400 text-xs font-semibold uppercase">Newsletter Settings</p>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Newsletter Title</label><input type="text" value={formData.newsletterTitle} onChange={e=>setFormData(p=>({...p,newsletterTitle:e.target.value}))} className={inp}/></div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Newsletter Description</label><textarea value={formData.newsletterDescription} onChange={e=>setFormData(p=>({...p,newsletterDescription:e.target.value}))} rows={2} className={inp}/></div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Button Text</label><input type="text" value={formData.newsletterButtonText} onChange={e=>setFormData(p=>({...p,newsletterButtonText:e.target.value}))} className={inp}/></div>
                          <div><label className="block text-gray-300 mb-1.5 text-sm">Success Message</label><input type="text" value={formData.newsletterSuccessText} onChange={e=>setFormData(p=>({...p,newsletterSuccessText:e.target.value}))} className={inp}/></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── SEO ────────────────────────────────────────────────── */}
                {activeTab==="seo" && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">SEO Title <span className="text-red-400">*</span></label>
                      <input type="text" value={formData.seoTitle} onChange={e=>{setFormData(p=>({...p,seoTitle:e.target.value}));setFormErrors(p=>({...p,seoTitle:""}));}} className={`${inp} ${inpErr("seoTitle")}`} placeholder={`${formData.title} | London News`}/>
                      {formErrors.seoTitle&&<p className="text-red-400 text-xs mt-1">{formErrors.seoTitle}</p>}
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">SEO Description <span className="text-red-400">*</span></label>
                      <textarea value={formData.seoDescription} onChange={e=>{setFormData(p=>({...p,seoDescription:e.target.value}));setFormErrors(p=>({...p,seoDescription:""}));}} rows={3} className={`${inp} ${inpErr("seoDescription")}`} placeholder="Learn about London News, our mission, and our team..."/>
                      {formErrors.seoDescription&&<p className="text-red-400 text-xs mt-1">{formErrors.seoDescription}</p>}
                    </div>
                    {/* <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">Open Graph Image URL (optional)</label>
                      <input type="text" value={formData.ogImage} onChange={e=>setFormData(p=>({...p,ogImage:e.target.value}))} className={inp} placeholder="https://example.com/og-image.jpg"/>
                    </div> */}
                  </div>
                )}

                {/* ── Content ────────────────────────────────────────────── */}
                {activeTab==="content" && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">Hero Image</label>
                      <p className="text-gray-500 text-xs mb-2">Only .webp · Under 100 KB</p>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 cursor-pointer">
                          <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-all bg-black/20 ${formErrors.heroImage?'border-red-500':'border-gray-700 hover:border-[#F5C645]'}`}>
                            <FiUpload className="mx-auto text-gray-500 mb-2" size={20}/>
                            <p className="text-gray-400 text-sm">{heroImagePreview?"Replace image":"Upload .webp image"}</p>
                          </div>
                          <input type="file" accept=".webp,image/webp" onChange={handleHeroImage} className="hidden"/>
                        </label>
                        {heroImagePreview && (
                          <div className="relative shrink-0">
                            <img src={heroImagePreview} alt="preview" className="w-24 h-20 rounded-xl object-cover"/>
                            <button type="button" onClick={()=>{setHeroImageFile(null);setHeroImagePreview("");}} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600"><FiX size={10}/></button>
                          </div>
                        )}
                      </div>
                      {formErrors.heroImage&&<p className="text-red-400 text-xs mt-1">{formErrors.heroImage}</p>}
                      <div className="mt-3">
                        <label className="block text-gray-300 mb-1.5 text-sm">Hero Image Alt Text</label>
                        <input type="text" value={formData.heroImageAlt} onChange={e=>setFormData(p=>({...p,heroImageAlt:e.target.value}))} className={inp} placeholder="Descriptive text for accessibility"/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">Hero Title</label>
                      <input type="text" value={formData.heroTitle} onChange={e=>setFormData(p=>({...p,heroTitle:e.target.value}))} className={inp} placeholder="About London News"/>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1.5 text-sm">Hero Subtitle</label>
                      <textarea value={formData.heroSubtitle} onChange={e=>setFormData(p=>({...p,heroSubtitle:e.target.value}))} rows={2} className={inp} placeholder="Independent journalism for a connected London"/>
                    </div>
                  </div>
                )}

                {/* ── Policy Content ─────────────────────────────────────── */}
                {activeTab==="policy" && formData.template==="policy" && (
                  <div className="space-y-5">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                      <p className="text-blue-400 text-sm flex items-center gap-2"><FiAlertCircle size={16}/>You are editing a policy/legal page. Each section below will appear in the sidebar navigation on the public page.</p>
                      <p className="text-gray-400 text-xs mt-2"><strong>Formatting Tips:</strong><br/>• Use • for bullet points<br/>• Use # for subheadings<br/>• Use 1. for numbered lists<br/>• Leave blank lines between paragraphs</p>
                    </div>
                    {!formData.slug?.trim() ? (
                      <div className="text-center py-12 border border-dashed border-yellow-500/50 rounded-xl bg-yellow-500/5">
                        <div className="text-yellow-500 text-4xl mb-3">⚠️</div>
                        <p className="text-yellow-500 text-sm font-medium">Please enter a slug first</p>
                        <p className="text-gray-500 text-xs mt-2">Go to the <strong>Basic Info</strong> tab and enter a slug like:<br/><code className="text-[#F5C645]">advertising-policy</code>, <code className="text-[#F5C645]">privacy-policy</code>, etc.</p>
                      </div>
                    ) : policyNavLinks.length===0 ? (
                      <div className="text-center py-12 border border-dashed border-red-500/50 rounded-xl bg-red-500/5">
                        <p className="text-red-500 text-sm">No section template found for slug: <strong>{formData.slug}</strong></p>
                        <p className="text-gray-500 text-xs mt-2">Supported slugs: advertising-policy, corrections-policy, editorial-policy, privacy-policy,<br/>right-of-reply, source-methodology, ownership-and-funding, legal, terms-and-conditions</p>
                      </div>
                    ) : policyNavLinks.map(link=>(
                      <div key={link.id} className="border border-gray-800 rounded-xl p-4">
                        <label className="block text-[#F5C645] mb-2 text-sm font-semibold">{link.label}</label>
                        <textarea value={formData.policyContent?.[link.id]||""} onChange={e=>updatePolicyContent(link.id,e.target.value)} rows={10} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645] font-mono" placeholder={`Enter content for ${link.label}...`}/>
                        <p className="text-gray-500 text-xs mt-2">Section ID: {link.id}</p>
                      </div>
                    ))}
                    {formData.slug?.trim() && (
                      <div className="border border-gray-800 rounded-xl p-4">
                        <label className="block text-[#F5C645] mb-2 text-sm font-semibold flex items-center gap-2"><FiCalendar size={14}/> Last Updated Date</label>
                        <input type="date" value={formData.lastUpdated?new Date(formData.lastUpdated).toISOString().split('T')[0]:new Date().toISOString().split('T')[0]} onChange={e=>setFormData(p=>({...p,lastUpdated:e.target.value}))} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F5C645]"/>
                      </div>
                    )}
                    {formErrors.policy&&<p className="text-red-400 text-xs mt-1">{formErrors.policy}</p>}
                  </div>
                )}

                {/* ── Jobs ───────────────────────────────────────────────── */}
                {activeTab==="jobs" && formData.template==="careers" && (
                  <div className="space-y-5">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <p className="text-blue-400 text-sm flex items-center gap-2"><FiAlertCircle size={16}/>Manage job listings for your careers page.</p>
                    </div>
                    <div className="flex justify-end">
                      <button type="button" onClick={addJob} className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all cursor-pointer text-sm"><FiPlus size={14}/> Add Job Listing</button>
                    </div>
                    {(!formData.jobsList||formData.jobsList.length===0)&&(
                      <div className="text-center py-12 border border-dashed border-gray-700 rounded-xl">
                        <p className="text-gray-500 text-sm">No job listings added yet.</p>
                      </div>
                    )}
                    {(formData.jobsList||[]).map((job,idx)=>(
                      <div key={idx} className="border border-gray-800 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-500 text-xs">Job #{idx+1}</span>
                            <label className="flex items-center gap-2"><input type="checkbox" checked={job.isActive!==false} onChange={e=>updateJob(idx,"isActive",e.target.checked)} className="w-4 h-4 rounded"/><span className="text-gray-400 text-xs">Active</span></label>
                          </div>
                          <button type="button" onClick={()=>removeJob(idx)} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg cursor-pointer"><FiTrash2 size={14}/></button>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div><label className="block text-gray-400 text-xs mb-1">Job Title *</label><input type="text" value={job.title||""} onChange={e=>updateJob(idx,"title",e.target.value)} placeholder="e.g., Senior Reporter" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]" required/></div>
                            <div><label className="block text-gray-400 text-xs mb-1">Location</label><input type="text" value={job.location||""} onChange={e=>updateJob(idx,"location",e.target.value)} placeholder="e.g., London, Hybrid, Remote" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/></div>
                          </div>
                          <div><label className="block text-gray-400 text-xs mb-1">Employment Type</label><select value={job.type||"Full-time"} onChange={e=>updateJob(idx,"type",e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Freelance</option><option>Internship</option></select></div>
                          <div><label className="block text-gray-400 text-xs mb-1">Job Description</label><textarea value={job.description||""} onChange={e=>updateJob(idx,"description",e.target.value)} rows={4} placeholder="Describe the role, responsibilities, requirements, and benefits..." className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#F5C645]"/></div>
                        </div>
                      </div>
                    ))}
                    {formErrors.jobs&&<p className="text-red-400 text-xs mt-1">{formErrors.jobs}</p>}
                  </div>
                )}

                {/* ── Block Builder ──────────────────────────────────────── */}
                {activeTab==="blocks" && formData.template==="custom" && (
                  <div className="space-y-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                      <p className="text-blue-400 text-sm flex items-center gap-2">
                        <FiAlertCircle size={16}/>
                        {isMobile
                          ? "Add blocks below. Live preview appears underneath."
                          : "Add blocks and watch the live preview update on the right."}
                      </p>
                    </div>

                    {isMobile ? (
                      /* ── MOBILE: stacked layout ── */
                      <div className="space-y-4">
                        <BlockEditorPanel
                          blocks={formData.blocks}
                          blockImageFiles={blockImageFiles}
                          formErrors={formErrors}
                          onAddBlock={addBlock}
                          onUpdateBlock={updateBlock}
                          onRemoveBlock={removeBlock}
                          onMoveBlock={moveBlock}
                          onHandleBlockImage={handleBlockImage}
                          onAddFAQ={addFAQ}
                          onUpdateFAQ={updateFAQ}
                          onRemoveFAQ={removeFAQ}
                          onAddListItem={addListItem}
                          onUpdateListItem={updateListItem}
                          onRemoveListItem={removeListItem}
                        />
                        <div>
                          <p className="text-gray-400 text-xs font-semibold uppercase mb-2">Live Preview</p>
                          <PagePreview blocks={formData.blocks} isMobile={true} />
                        </div>
                      </div>
                    ) : (
                      /* ── DESKTOP: side-by-side layout ── */
                      <div
                        className="rounded-xl border border-gray-800"
                        style={{ display:"flex", alignItems:"flex-start", overflow:"clip", minHeight:560 }}
                      >
                        {/* Left: editor */}
                        <div className="flex-1 p-4 space-y-4" style={{ minWidth:0, overflowY:"auto" }}>
                          <BlockEditorPanel
                            blocks={formData.blocks}
                            blockImageFiles={blockImageFiles}
                            formErrors={formErrors}
                            onAddBlock={addBlock}
                            onUpdateBlock={updateBlock}
                            onRemoveBlock={removeBlock}
                            onMoveBlock={moveBlock}
                            onHandleBlockImage={handleBlockImage}
                            onAddFAQ={addFAQ}
                            onUpdateFAQ={updateFAQ}
                            onRemoveFAQ={removeFAQ}
                            onAddListItem={addListItem}
                            onUpdateListItem={updateListItem}
                            onRemoveListItem={removeListItem}
                          />
                        </div>
                        {/* Right: sticky preview */}
                        <PagePreview blocks={formData.blocks} isMobile={false} />
                      </div>
                    )}
                  </div>
                )}
              </form>

              {/* Footer buttons */}
              <div className="flex gap-3 pt-6 mt-4 border-t border-gray-800 px-5 sm:px-6 pb-6">
                <button type="button" onClick={closeModal} disabled={saving} className="px-6 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all cursor-pointer text-sm">Cancel</button>
                <div className="flex-1"/>
                {(() => {
                  const tabs = getTabList();
                  const cur  = tabs.findIndex(t=>t.id===activeTab);
                  const last = cur===tabs.length-1;
                  if (last) return (
                    <button type="button" disabled={saving} onClick={handleSubmit}
                      className="px-8 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all font-semibold disabled:opacity-50 cursor-pointer flex items-center gap-2 text-sm">
                      <FiSave size={15}/>{saving?"Saving...":editingPage?"Update Page":"Create Page"}
                    </button>
                  );
                  return (
                    <button type="button" onClick={()=>setActiveTab(tabs[cur+1].id)}
                      className="px-8 py-2.5 bg-[#F5C645] text-black rounded-lg hover:bg-[#F5C645]/90 transition-all font-semibold cursor-pointer text-sm">
                      Next →
                    </button>
                  );
                })()}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}