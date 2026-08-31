"use client";

import React, { useState } from "react";
import {
  Sparkles,
  MessageSquare,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Send,
  Users,
  Briefcase,
  Layers,
} from "../../lib/icons";

interface ProjectItem {
  id: string;
  name: string;
  client: string;
  status: string;
  leadDesigner: string;
  leadDev: string;
  leadSales: string;
  partnerLead: string;
  progress: number;
}

interface BlogPost {
  id: string;
  projectId: string;
  authorRole: "designer" | "sales" | "partner" | "dev";
  authorName: string;
  authorTitle: string;
  date: string;
  title: string;
  content: string;
  category: "UI / UX" | "Ventas & Alcance" | "Arquitectura & Dev" | "Finanzas & Auditoría";
  attachment?: {
    label: string;
    type: "figma" | "github" | "contract" | "metrics";
  };
  commentsCount: number;
}

interface ChatMessage {
  id: string;
  projectId: string;
  authorRole: "designer" | "sales" | "partner" | "dev" | "client";
  authorName: string;
  authorTitle: string;
  text: string;
  time: string;
}

interface ProjectTeamFeedAndChatProps {
  currentRole?: string;
  currentUserName?: string;
}

export default function ProjectTeamFeedAndChat({
  currentRole = "asesor",
  currentUserName = "Carlos Mendoza",
}: ProjectTeamFeedAndChatProps) {
  // Available Projects
  const projects: ProjectItem[] = [
    {
      id: "proj-1",
      name: "App Móvil Delivery & Reservas en Tiempo Real",
      client: "Gourmet Express S.A. (Alejandro Morales)",
      status: "En Desarrollo (Sprint 4)",
      leadDesigner: "Sofía (UX/UI & Color)",
      leadDev: "Rodrigo Silva (Tech Lead) & Iván Core",
      leadSales: "Carlos Mendoza (Comercial)",
      partnerLead: "Dirección General",
      progress: 75,
    },
    {
      id: "proj-2",
      name: "Plataforma Clínica Médica con Diagnóstico AI",
      client: "Medicloud (Dr. Roberto Garza)",
      status: "Anticipo Cubierto (Sprint 1)",
      leadDesigner: "Sofía (UX/UI Lead)",
      leadDev: "Iván (Neural Engine)",
      leadSales: "Carlos Mendoza (Comercial)",
      partnerLead: "Dirección General",
      progress: 30,
    },
    {
      id: "proj-3",
      name: "ERP de Inventarios & WebSockets Logística",
      client: "Grupo Logístico Norte (Ing. Laura Paredes)",
      status: "Cotización Aprobada",
      leadDesigner: "Sofía (Prototipado)",
      leadDev: "Rodrigo Silva & Iván Core",
      leadSales: "Carlos Mendoza (Comercial)",
      partnerLead: "Dirección General",
      progress: 15,
    },
  ];

  const [selectedProjectId, setSelectedProjectId] = useState<string>("proj-1");
  const [activeTab, setActiveTab] = useState<"blog" | "chat">("blog");

  // Blog Posts State
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "p-1",
      projectId: "proj-1",
      authorRole: "designer",
      authorName: "Sofía",
      authorTitle: "Lead UX/UI & Colorimetría",
      date: "Hoy, 10:15 AM",
      title: "🎨 Entregable de Figma: Flujo de Carrito y Checkout a 60fps",
      content:
        "Subimos la versión definitiva de las 18 pantallas de pedidos. Optimizamos la paleta de colores para modo nocturno con contrastes accesibles y micro-interacciones táctiles listas para maquetación.",
      category: "UI / UX",
      attachment: {
        label: "figma.com/file/gourmet-express-v4",
        type: "figma",
      },
      commentsCount: 3,
    },
    {
      id: "p-2",
      projectId: "proj-1",
      authorRole: "dev",
      authorName: "Rodrigo Silva & Iván",
      authorTitle: "Dev Lead & Software Architect",
      date: "Hoy, 11:30 AM",
      title: "⚡ Staging Desplegado: WebSockets GPS & PostgreSQL Conectados",
      content:
        "El cluster de geolocalización en tiempo real ya emite coordenadas cada 1.5s sin sobrecargar el servidor. El webhook de Stripe para retenciones de anticipo está probado en staging con latencia de 18ms.",
      category: "Arquitectura & Dev",
      attachment: {
        label: "staging.gourmetexpress.mx/build-402",
        type: "github",
      },
      commentsCount: 2,
    },
    {
      id: "p-3",
      projectId: "proj-1",
      authorRole: "sales",
      authorName: "Carlos Mendoza",
      authorTitle: "Asesor Comercial",
      date: "Ayer, 04:45 PM",
      title: "💼 Aprobación de Alcance y Confirmación de Anticipo",
      content:
        "El cliente Alejandro Morales aprobó el alcance de la Fase 04 sin modificaciones de presupuesto. La orden de trabajo y contrato fueron formalizados con éxito.",
      category: "Ventas & Alcance",
      attachment: {
        label: "Ficha de Atribución COT-104.pdf",
        type: "contract",
      },
      commentsCount: 1,
    },
    {
      id: "p-4",
      projectId: "proj-1",
      authorRole: "partner",
      authorName: "Dirección General",
      authorTitle: "Socio Fundador",
      date: "Ayer, 06:00 PM",
      title: "👑 Liberación de Infraestructura & Conciliación de Comisiones",
      content:
        "Se autorizó la ampliación de instancias Redis en AWS y la asignación del tabulador de comisiones correspondiente a la bolsa del 20% conforme a contrato.",
      category: "Finanzas & Auditoría",
      attachment: {
        label: "Reporte Financiero Q3",
        type: "metrics",
      },
      commentsCount: 4,
    },
  ]);

  // Chat Messages State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "c-1",
      projectId: "proj-1",
      authorRole: "sales",
      authorName: "Carlos Mendoza (Ventas)",
      authorTitle: "Asesor Comercial",
      text: "Equipo, el cliente nos pregunta si en la vista de pedidos podemos resaltar el tiempo estimado de llegada en color ámbar.",
      time: "10:45 AM",
    },
    {
      id: "c-2",
      projectId: "proj-1",
      authorRole: "designer",
      authorName: "Sofía (Diseño)",
      authorTitle: "Lead UX/UI",
      text: "¡Excelente idea Carlos! Ajusté el token #FFB703 en Figma con un glow sutil para que sea ultra legible.",
      time: "10:48 AM",
    },
    {
      id: "c-3",
      projectId: "proj-1",
      authorRole: "dev",
      authorName: "Rodrigo Silva (Dev)",
      authorTitle: "Tech Lead",
      text: "Recibido. Ya lo integré en el componente de Tailwind y en staging está visible.",
      time: "10:52 AM",
    },
    {
      id: "c-4",
      projectId: "proj-1",
      authorRole: "partner",
      authorName: "Dirección (Socio)",
      authorTitle: "Board",
      text: "Excelente velocidad de respuesta equipo. El sprint sigue en tiempo para entrega el 05 Sep.",
      time: "11:00 AM",
    },
  ]);

  // New Post Form State
  const [isPosting, setIsPosting] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState<BlogPost["category"]>("UI / UX");

  // New Chat Message State
  const [chatText, setChatText] = useState("");

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const projectPosts = posts.filter((p) => p.projectId === selectedProjectId);
  const projectMessages = messages.filter((m) => m.projectId === selectedProjectId);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: BlogPost = {
      id: "p-" + Date.now(),
      projectId: selectedProjectId,
      authorRole:
        currentRole === "dev"
          ? "dev"
          : currentRole === "socio"
          ? "partner"
          : currentRole === "asesor"
          ? "sales"
          : "designer",
      authorName: currentUserName,
      authorTitle:
        currentRole === "dev"
          ? "Ingeniería & Dev"
          : currentRole === "socio"
          ? "Socio / Finanzas"
          : currentRole === "asesor"
          ? "Asesor Comercial"
          : "Diseño & UX",
      date: "Hace unos momentos",
      title: newPostTitle.trim(),
      content: newPostContent.trim(),
      category: newPostCategory,
      commentsCount: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setIsPosting(false);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;

    const newMsg: ChatMessage = {
      id: "c-" + Date.now(),
      projectId: selectedProjectId,
      authorRole:
        currentRole === "dev"
          ? "dev"
          : currentRole === "socio"
          ? "partner"
          : currentRole === "asesor"
          ? "sales"
          : "client",
      authorName: currentUserName,
      authorTitle:
        currentRole === "dev"
          ? "Dev & UX"
          : currentRole === "socio"
          ? "Socio"
          : currentRole === "asesor"
          ? "Ventas"
          : "Cliente",
      text: chatText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMsg]);
    setChatText("");

    // Simulate auto acknowledgment from other team roles
    setTimeout(() => {
      if (currentRole === "asesor" || currentRole === "usuario") {
        setMessages((prev) => [
          ...prev,
          {
            id: "c-bot-" + Date.now(),
            projectId: selectedProjectId,
            authorRole: "designer",
            authorName: "Sofía (Diseño)",
            authorTitle: "Lead UX/UI",
            text: "Anotado. Lo revisamos con el equipo de diseño e ingeniería para el siguiente release.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    }, 1000);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Top Banner & Project Selector */}
      <div className="rounded-[32px] bg-gradient-to-r from-purple-900/25 via-indigo-950/20 to-black/80 border border-purple-500/30 p-6 sm:p-8 backdrop-blur-2xl space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-xs font-mono text-purple-300 font-bold uppercase">
              <Users className="w-3.5 h-3.5" />
              <span>COLABORACIÓN MULTI-ROL • INNOCENTIA TEAM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-mono">
              Bitácora &amp; Chat de Proyecto
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light">
              Canal de coordinación unificado entre <strong>Diseñadores (Sofía)</strong>, <strong>Ingenieros (Iván)</strong>, <strong>Vendedores</strong> y <strong>Socios</strong>.
            </p>
          </div>

          {/* Project Selector Dropdown */}
          <div className="space-y-1.5 flex-shrink-0">
            <label className="text-[10px] font-mono text-gray-400 uppercase font-bold block">
              Seleccionar Proyecto Activo:
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-black border border-purple-400/40 text-xs font-mono font-bold text-white focus:outline-none focus:border-purple-400 cursor-pointer shadow-lg"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0c0d14] text-white">
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Project Card Snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-1">
            <span className="text-[10px] text-gray-400 block uppercase">Cliente Asignado</span>
            <strong className="text-white block truncate">{activeProject.client}</strong>
            <span className="text-[10px] text-emerald-400 block">{activeProject.status}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/60 border border-[#FF3858]/30 space-y-1">
            <span className="text-[10px] text-[#FF3858] block uppercase font-bold">🎨 Lead Diseño</span>
            <strong className="text-white block truncate">{activeProject.leadDesigner}</strong>
            <span className="text-[10px] text-gray-400 block">Figma &amp; UI Tokens</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/60 border border-[#00D1FF]/30 space-y-1">
            <span className="text-[10px] text-[#00D1FF] block uppercase font-bold">⚡ Lead Dev</span>
            <strong className="text-white block truncate">{activeProject.leadDev}</strong>
            <span className="text-[10px] text-gray-400 block">WebSockets &amp; Cloud</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-1">
            <span className="text-[10px] text-emerald-400 block uppercase font-bold">💼 Lead Comercial</span>
            <strong className="text-white block truncate">{activeProject.leadSales}</strong>
            <span className="text-[10px] text-gray-400 block">Tabulador 20% Activo</span>
          </div>
        </div>
      </div>

      {/* View Switcher: Blog / Bitácora vs Chat de Equipo */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("blog")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "blog"
                ? "bg-purple-600/30 border border-purple-400 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                : "bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>📰 Bitácora de Avances &amp; Hitos ({projectPosts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("chat")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "chat"
                ? "bg-[#00D1FF]/20 border border-[#00D1FF] text-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.3)]"
                : "bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>💬 Chat de Equipo en Vivo ({projectMessages.length})</span>
          </button>
        </div>

        {activeTab === "blog" && (
          <button
            type="button"
            onClick={() => setIsPosting(!isPosting)}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-[#00D1FF] text-white text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer shadow-md hover:scale-105"
          >
            {isPosting ? "✕ Cancelar Publicación" : "＋ Publicar Entrada en Bitácora"}
          </button>
        )}
      </div>

      {/* ======================================================== */}
      {/* VIEW 1: BLOG & BITÁCORA DE AVANCES */}
      {/* ======================================================== */}
      {activeTab === "blog" && (
        <div className="space-y-6">
          {/* New Post Creator Form Modal/Card */}
          {isPosting && (
            <form
              onSubmit={handleCreatePost}
              className="p-6 rounded-[28px] bg-gradient-to-r from-purple-950/40 via-black/90 to-black border border-purple-400/40 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white uppercase font-mono">
                  Nueva Entrada en la Bitácora de {activeProject.name}
                </h3>
                <span className="text-[10px] font-mono text-purple-300">
                  Publicando como: <strong>{currentUserName}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-gray-300 block">Título del Hito o Actualización *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 🎨 Entregable de Wireframes Fase 2 o ⚡ Despliegue de Base de Datos"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300 block">Categoría *</label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-purple-400 cursor-pointer"
                  >
                    <option value="UI / UX">UI / UX (Diseño)</option>
                    <option value="Arquitectura & Dev">Arquitectura &amp; Dev (Código)</option>
                    <option value="Ventas & Alcance">Ventas &amp; Alcance (Comercial)</option>
                    <option value="Finanzas & Auditoría">Finanzas &amp; Auditoría (Socios)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 text-xs font-mono">
                <label className="text-gray-300 block">Descripción Detallada / Acuerdos del Equipo *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe los avances, decisiones tomadas, pantallas listas o cambios de infraestructura acordados..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsPosting(false)}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-[#00D1FF] text-white text-xs font-bold font-mono uppercase tracking-wider cursor-pointer hover:scale-105 transition-all shadow-md"
                >
                  Publicar en Bitácora
                </button>
              </div>
            </form>
          )}

          {/* Posts Feed */}
          <div className="space-y-4">
            {projectPosts.map((post) => (
              <div
                key={post.id}
                className="p-6 rounded-[28px] bg-black/80 border border-white/15 hover:border-white/30 transition-all space-y-4 shadow-xl"
              >
                {/* Post Author Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm font-bold border ${
                        post.authorRole === "designer"
                          ? "bg-[#FF3858]/20 border-[#FF3858] text-[#FF3858]"
                          : post.authorRole === "dev"
                          ? "bg-[#00D1FF]/20 border-[#00D1FF] text-[#00D1FF]"
                          : post.authorRole === "sales"
                          ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                          : "bg-purple-500/20 border-purple-400 text-purple-300"
                      }`}
                    >
                      {post.authorRole === "designer"
                        ? "🎨"
                        : post.authorRole === "dev"
                        ? "💻"
                        : post.authorRole === "sales"
                        ? "💼"
                        : "👑"}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white font-mono">{post.authorName}</h4>
                        <span className="text-[10px] text-gray-400 font-mono">({post.authorTitle})</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">{post.date}</span>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border self-start sm:self-auto ${
                      post.category === "UI / UX"
                        ? "bg-[#FF3858]/10 text-[#FF3858] border-[#FF3858]/30"
                        : post.category === "Arquitectura & Dev"
                        ? "bg-[#00D1FF]/10 text-[#00D1FF] border-[#00D1FF]/30"
                        : post.category === "Ventas & Alcance"
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                        : "bg-purple-500/10 text-purple-300 border-purple-500/30"
                    }`}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Post Content */}
                <div className="space-y-2 text-xs sm:text-sm font-mono text-gray-200 leading-relaxed">
                  <h3 className="text-base font-bold text-white">{post.title}</h3>
                  <p className="text-gray-300 font-light">{post.content}</p>
                </div>

                {/* Attachment / Link */}
                {post.attachment && (
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">
                      📎 <strong>Recurso Adjunto:</strong> {post.attachment.label}
                    </span>
                    <span className="text-[#00D1FF] font-bold">Verificado ✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: CHAT DE EQUIPO MULTI-ROL EN TIEMPO REAL */}
      {/* ======================================================== */}
      {activeTab === "chat" && (
        <div className="p-6 rounded-[28px] bg-black/80 border border-white/20 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white uppercase font-mono">
                Mesa de Discusión en Vivo • {activeProject.name}
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Canal exclusivo para coordinar entregables, resolver dudas y alinear expectativas entre diseñadores, devs, ventas y socios.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                Equipo Sincronizado
              </span>
            </div>
          </div>

          {/* Quick Mention Suggestions */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="text-[10px] text-gray-400 uppercase font-bold self-center">Menciones Rápidas:</span>
            <button
              type="button"
              onClick={() => setChatText((prev) => prev + "@diseño ")}
              className="px-2.5 py-1 rounded-full bg-[#FF3858]/10 text-[#FF3858] border border-[#FF3858]/30 hover:bg-[#FF3858]/20 transition-all cursor-pointer"
            >
              @diseño (Sofía)
            </button>
            <button
              type="button"
              onClick={() => setChatText((prev) => prev + "@dev ")}
              className="px-2.5 py-1 rounded-full bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/30 hover:bg-[#00D1FF]/20 transition-all cursor-pointer"
            >
              @dev (Iván)
            </button>
            <button
              type="button"
              onClick={() => setChatText((prev) => prev + "@ventas ")}
              className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all cursor-pointer"
            >
              @ventas
            </button>
            <button
              type="button"
              onClick={() => setChatText((prev) => prev + "@socio ")}
              className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 hover:bg-purple-500/20 transition-all cursor-pointer"
            >
              @socio
            </button>
          </div>

          {/* Chat Messages Feed */}
          <div className="p-4 sm:p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4 max-h-[460px] overflow-y-auto">
            {projectMessages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                  <span
                    className={`font-bold ${
                      msg.authorRole === "designer"
                        ? "text-[#FF3858]"
                        : msg.authorRole === "dev"
                        ? "text-[#00D1FF]"
                        : msg.authorRole === "sales"
                        ? "text-emerald-400"
                        : "text-purple-300"
                    }`}
                  >
                    {msg.authorName}
                  </span>
                  <span>• {msg.time}</span>
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm font-mono max-w-2xl leading-relaxed border ${
                    msg.authorRole === "designer"
                      ? "bg-[#FF3858]/10 border-[#FF3858]/25 text-gray-200"
                      : msg.authorRole === "dev"
                      ? "bg-[#00D1FF]/10 border-[#00D1FF]/25 text-gray-200"
                      : msg.authorRole === "sales"
                      ? "bg-emerald-950/30 border-emerald-500/25 text-emerald-100"
                      : "bg-purple-950/30 border-purple-500/25 text-purple-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendChatMessage} className="flex items-center gap-3">
            <input
              type="text"
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              placeholder={`Escribe un mensaje para el equipo de ${activeProject.name}...`}
              className="flex-1 px-4 py-3 rounded-2xl bg-black border border-white/20 text-white text-xs sm:text-sm font-mono placeholder:text-gray-500 focus:outline-none focus:border-purple-400 shadow-inner"
            />

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-[#00D1FF] hover:from-purple-600 hover:to-[#00E5FF] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 transition-all cursor-pointer"
            >
              <span>Enviar</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
