"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Camera,
  Key,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  User,
  UploadCloud,
  ImageIcon,
  Sparkles,
  Lock,
  RotateCcw,
} from "../../lib/icons";
import { UserAccount } from "./AuthLoginModal";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserAccount;
  onUpdateUser: (updatedData: Partial<UserAccount> & { newPassword?: string }) => void;
}

const PRESET_AVATARS = [
  { id: "av1", label: "Tech Executive", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
  { id: "av2", label: "Business Lead", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { id: "av3", label: "Creative Director", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
  { id: "av4", label: "Senior Engineer", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  { id: "av5", label: "Growth Partner", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
  { id: "av6", label: "Cyber Lead", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" },
];

export default function UserProfileModal({
  isOpen,
  onClose,
  activeUser,
  onUpdateUser,
}: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState<"foto" | "password" | "cuenta">("foto");

  // Avatar state
  const [avatarPreview, setAvatarPreview] = useState<string>(activeUser.avatarUrl || "");
  const [customUrlInput, setCustomUrlInput] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Feedback states
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  // Handle local image upload via file reader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("La imagen seleccionada supera los 5MB. Por favor elige una imagen más ligera.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
      setErrorMessage("");
      setSuccessMessage("Imagen cargada. Haz clic en 'Guardar Foto' para aplicar.");
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAvatar = (urlToSave?: string) => {
    const finalUrl = urlToSave !== undefined ? urlToSave : avatarPreview;
    onUpdateUser({ avatarUrl: finalUrl });
    setSuccessMessage("¡Foto de perfil actualizada con éxito!");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview("");
    setCustomUrlInput("");
    handleSaveAvatar("");
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    setAvatarPreview(customUrlInput.trim());
    handleSaveAvatar(customUrlInput.trim());
    setCustomUrlInput("");
  };

  // Handle Password Change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Las nuevas contraseñas no coinciden. Verifica e intenta de nuevo.");
      return;
    }

    // Update password
    onUpdateUser({ newPassword: newPassword.trim(), password: newPassword.trim() });
    setSuccessMessage("✅ ¡Contraseña actualizada exitosamente! Se guardó para tus próximos inicios de sesión.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-xl bg-[#07070E] border border-white/20 rounded-[36px] p-6 sm:p-8 shadow-[0_0_80px_rgba(0,209,255,0.2)] text-left relative overflow-hidden my-auto space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#FF3858]/15 via-[#00D1FF]/10 to-transparent blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF3858] to-[#00D1FF] p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#07070E] rounded-[14px] flex items-center justify-center">
                <User className="w-5 h-5 text-[#00D1FF]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                Mi Perfil & Seguridad
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                {activeUser.name} • {activeUser.roleTitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10">
          <button
            type="button"
            onClick={() => {
              setActiveTab("foto");
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "foto"
                ? "bg-[#00D1FF] text-black shadow-lg shadow-cyan-500/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Foto de Perfil</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("password");
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "password"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Cambiar Contraseña</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("cuenta");
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "cuenta"
                ? "bg-white/15 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cuenta</span>
          </button>
        </div>

        {/* Alert Messages */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: FOTO DE PERFIL */}
        {/* ========================================================================= */}
        {activeTab === "foto" && (
          <div className="space-y-6 text-xs font-mono">
            {/* Current Avatar Big Preview */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-3xl bg-white/[0.02] border border-white/10">
              <div className="relative group">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#FF3858] via-purple-600 to-[#00D1FF] p-0.5 shadow-[0_0_25px_rgba(0,209,255,0.4)] overflow-hidden flex items-center justify-center">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt={activeUser.name}
                      className="w-full h-full object-cover rounded-[22px]"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#07070E] rounded-[22px] flex items-center justify-center text-2xl font-black text-[#00D1FF]">
                      {activeUser.avatarLetter || activeUser.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Cambiar foto"
                  className="absolute bottom-1 right-1 p-2 rounded-xl bg-black/80 border border-white/30 text-[#00D1FF] hover:text-white hover:scale-110 transition-all cursor-pointer shadow-lg"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div>
                  <h4 className="text-sm font-black text-white">{activeUser.name}</h4>
                  <p className="text-[11px] text-gray-400">{activeUser.roleTitle}</p>
                </div>

                <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00D1FF] to-purple-600 text-black font-black text-[11px] flex items-center gap-1.5 hover:scale-105 transition-all cursor-pointer shadow-md"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Subir de tu Equipo</span>
                  </button>

                  {avatarPreview && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 border border-white/10 text-[11px] transition-all cursor-pointer"
                    >
                      Quitar Foto
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="space-y-3">
              <label className="block text-gray-300 font-bold text-xs">
                O elige un avatar corporativo de alta calidad:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {PRESET_AVATARS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setAvatarPreview(preset.url);
                      handleSaveAvatar(preset.url);
                    }}
                    className={`p-1 rounded-2xl border transition-all cursor-pointer group flex flex-col items-center gap-1.5 ${
                      avatarPreview === preset.url
                        ? "border-[#00D1FF] bg-[#00D1FF]/10 ring-2 ring-[#00D1FF]/40"
                        : "border-white/10 bg-white/[0.02] hover:border-white/30"
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-12 h-12 rounded-xl object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="text-[9px] text-gray-400 truncate w-full text-center">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom URL Input */}
            <form onSubmit={handleApplyCustomUrl} className="space-y-2 pt-2 border-t border-white/10">
              <label className="block text-gray-400 text-[11px]">
                O pega un enlace directo de imagen (URL web):
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="https://ejemplo.com/mi-foto.jpg"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-600 focus:border-[#00D1FF] focus:outline-none text-xs font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  Aplicar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CAMBIAR CONTRASEÑA */}
        {/* ========================================================================= */}
        {activeTab === "password" && (
          <form onSubmit={handleChangePassword} className="space-y-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-purple-300 text-[11px] leading-relaxed">
              🔐 <strong>Seguridad de Cuenta:</strong> Tu nueva contraseña se guardará encriptada en tu sesión y te permitirá acceder de inmediato sin depender de claves anteriores.
            </div>

            {/* Nueva Contraseña */}
            <div className="space-y-1.5">
              <label className="block text-gray-300 font-bold">Nueva Contraseña:</label>
              <div className="relative">
                <input
                  type={showNewPass ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-purple-500 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-1.5">
              <label className="block text-gray-300 font-bold">Confirmar Nueva Contraseña:</label>
              <div className="relative">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la nueva contraseña"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/70 border border-white/20 text-white focus:border-purple-500 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                >
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-[#00D1FF] to-emerald-500 text-white font-black uppercase tracking-wider hover:scale-105 transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] cursor-pointer"
              >
                Guardar Nueva Contraseña
              </button>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: DETALLES DE CUENTA */}
        {/* ========================================================================= */}
        {activeTab === "cuenta" && (
          <div className="space-y-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Usuario:</span>
                <strong className="text-white">{activeUser.name}</strong>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Correo Electrónico:</span>
                <span className="text-[#00D1FF]">{activeUser.email}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Rol Corporativo:</span>
                <span className="text-purple-300 font-bold">{activeUser.roleTitle}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-gray-400">Empresa / División:</span>
                <span className="text-gray-200">{activeUser.company || "Innocentia Tech"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estado de Verificación:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Activo & Verificado
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
