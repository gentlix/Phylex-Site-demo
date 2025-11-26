"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Camera, Shield, Building2, QrCode, Bot } from "lucide-react"

export default function AccountPage() {
  const [profileData, setProfileData] = useState({
    fullName: "Karina Bokovskaya",
    email: "karina@example.com",
    profilePicture: "",
    banner: "",
  })

  const [twoFactorAuth, setTwoFactorAuth] = useState({
    enabled: false,
    method: "none" as "none" | "google" | "telegram",
    googleSecret: "",
    telegramBotToken: "",
  })

  const [billingData, setBillingData] = useState({
    companyName: "",
    billingAddress: "",
    country: "",
    city: "",
    postcode: "",
    state: "",
    phone: "",
    taxId: "",
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBillingChange = (field: string, value: string) => {
    setBillingData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (type: "profilePicture" | "banner", file: File | null) => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, [type]: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const generateGoogleAuthSecret = () => {
    // Generate a BASE32 secret for Google Authenticator
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
    let secret = ""
    for (let i = 0; i < 16; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setTwoFactorAuth((prev) => ({ ...prev, googleSecret: secret }))
  }

  const handleSaveProfile = () => {
    // TODO: Implement API call to save profile
    console.log("Saving profile:", profileData)
  }

  const handleSave2FA = () => {
    // TODO: Implement API call to save 2FA settings
    console.log("Saving 2FA:", twoFactorAuth)
  }

  const handleSaveBilling = () => {
    // TODO: Implement API call to save billing information
    console.log("Saving billing:", billingData)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden bg-background">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Account Management</h1>
              <p className="text-muted-foreground mt-2">Manage your profile, security, and billing information</p>
            </div>

            {/* Profile Section */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your profile picture, banner, and personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Banner Upload */}
                <div className="space-y-2">
                  <Label>Banner</Label>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border bg-muted">
                    {profileData.banner ? (
                      <img src={profileData.banner} alt="Banner" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Camera className="h-8 w-8" />
                      </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-background/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload("banner", e.target.files?.[0] || null)}
                      />
                      <Camera className="h-6 w-6 text-muted-foreground" />
                    </label>
                  </div>
                </div>

                {/* Profile Picture Upload */}
                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileData.profilePicture} alt={profileData.fullName} />
                      <AvatarFallback>
                        {profileData.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <label>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload("profilePicture", e.target.files?.[0] || null)}
                        />
                        <Button type="button" variant="outline" asChild>
                          <span>Upload Photo</span>
                        </Button>
                      </label>
                      <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max size 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleProfileChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <Button onClick={handleSaveProfile}>Save Profile</Button>
              </CardContent>
            </Card>

            {/* 2FA Settings Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription>Enhance your account security with two-factor authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Enable 2FA Toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable-2fa">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch
                    id="enable-2fa"
                    checked={twoFactorAuth.enabled}
                    onCheckedChange={(checked) =>
                      setTwoFactorAuth((prev) => ({ ...prev, enabled: checked, method: checked ? "google" : "none" }))
                    }
                  />
                </div>

                {twoFactorAuth.enabled && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Authentication Method</Label>
                        <Select
                          value={twoFactorAuth.method}
                          onValueChange={(value: "google" | "telegram") =>
                            setTwoFactorAuth((prev) => ({ ...prev, method: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select authentication method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="google">Google Authenticator</SelectItem>
                            <SelectItem value="telegram">Telegram Bot Login</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Google Authenticator Setup */}
                      {twoFactorAuth.method === "google" && (
                        <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/50">
                          <div className="flex items-center gap-2">
                            <QrCode className="h-5 w-5" />
                            <Label className="text-base">Google Authenticator Setup</Label>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="google-secret">BASE32 Secret</Label>
                            <div className="flex gap-2">
                              <Input
                                id="google-secret"
                                value={twoFactorAuth.googleSecret}
                                onChange={(e) =>
                                  setTwoFactorAuth((prev) => ({ ...prev, googleSecret: e.target.value }))
                                }
                                placeholder="BASE32SECRET"
                                readOnly
                              />
                              <Button type="button" variant="outline" onClick={generateGoogleAuthSecret}>
                                Generate
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Scan the QR code with Google Authenticator app or enter this secret manually
                            </p>
                            {twoFactorAuth.googleSecret && (
                              <div className="mt-4 p-4 border border-border rounded-lg bg-background flex items-center justify-center">
                                {/* QR Code would be generated here using a library like qrcode.react */}
                                <div className="text-center space-y-2">
                                  <div className="text-sm font-mono bg-card p-2 rounded border">
                                    {twoFactorAuth.googleSecret}
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    Scan this with Google Authenticator
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Telegram Bot Setup */}
                      {twoFactorAuth.method === "telegram" && (
                        <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/50">
                          <div className="flex items-center gap-2">
                            <Bot className="h-5 w-5" />
                            <Label className="text-base">Telegram Bot Login Setup</Label>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="telegram-token">Telegram Bot Token</Label>
                            <Input
                              id="telegram-token"
                              type="password"
                              value={twoFactorAuth.telegramBotToken}
                              onChange={(e) =>
                                setTwoFactorAuth((prev) => ({ ...prev, telegramBotToken: e.target.value }))
                              }
                              placeholder="Enter your Telegram bot token"
                            />
                            <p className="text-xs text-muted-foreground">
                              Connect your Telegram account for two-factor authentication
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <Button onClick={handleSave2FA} disabled={twoFactorAuth.enabled && !twoFactorAuth.method}>
                  Save 2FA Settings
                </Button>
              </CardContent>
            </Card>

            {/* Customer Payeer Profile Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Customer Payeer Profile
                </CardTitle>
                <CardDescription>
                  Billing information required for invoices. This information will be displayed on all invoices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={billingData.companyName}
                      onChange={(e) => handleBillingChange("companyName", e.target.value)}
                      placeholder="Enter company name (optional)"
                    />
                  </div>

                  {/* Tax ID */}
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                    <Input
                      id="taxId"
                      value={billingData.taxId}
                      onChange={(e) => handleBillingChange("taxId", e.target.value)}
                      placeholder="Enter tax ID (optional)"
                    />
                  </div>
                </div>

                {/* Billing Address */}
                <div className="space-y-2">
                  <Label htmlFor="billingAddress">Billing Address *</Label>
                  <Textarea
                    id="billingAddress"
                    value={billingData.billingAddress}
                    onChange={(e) => handleBillingChange("billingAddress", e.target.value)}
                    placeholder="Enter your billing address"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select
                      value={billingData.country}
                      onValueChange={(value) => handleBillingChange("country", value)}
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="IT">Italy</SelectItem>
                        <SelectItem value="ES">Spain</SelectItem>
                        <SelectItem value="NL">Netherlands</SelectItem>
                        <SelectItem value="BE">Belgium</SelectItem>
                        <SelectItem value="CH">Switzerland</SelectItem>
                        <SelectItem value="AT">Austria</SelectItem>
                        <SelectItem value="SE">Sweden</SelectItem>
                        <SelectItem value="NO">Norway</SelectItem>
                        <SelectItem value="DK">Denmark</SelectItem>
                        <SelectItem value="FI">Finland</SelectItem>
                        <SelectItem value="PL">Poland</SelectItem>
                        <SelectItem value="CZ">Czech Republic</SelectItem>
                        <SelectItem value="IE">Ireland</SelectItem>
                        <SelectItem value="PT">Portugal</SelectItem>
                        <SelectItem value="GR">Greece</SelectItem>
                        <SelectItem value="RO">Romania</SelectItem>
                        <SelectItem value="HU">Hungary</SelectItem>
                        <SelectItem value="BG">Bulgaria</SelectItem>
                        <SelectItem value="HR">Croatia</SelectItem>
                        <SelectItem value="SK">Slovakia</SelectItem>
                        <SelectItem value="SI">Slovenia</SelectItem>
                        <SelectItem value="LT">Lithuania</SelectItem>
                        <SelectItem value="LV">Latvia</SelectItem>
                        <SelectItem value="EE">Estonia</SelectItem>
                        <SelectItem value="LU">Luxembourg</SelectItem>
                        <SelectItem value="MT">Malta</SelectItem>
                        <SelectItem value="CY">Cyprus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* State/Province */}
                  <div className="space-y-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Input
                      id="state"
                      value={billingData.state}
                      onChange={(e) => handleBillingChange("state", e.target.value)}
                      placeholder="Enter state or province"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* City */}
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={billingData.city}
                      onChange={(e) => handleBillingChange("city", e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>

                  {/* Postcode */}
                  <div className="space-y-2">
                    <Label htmlFor="postcode">Postcode / ZIP Code *</Label>
                    <Input
                      id="postcode"
                      value={billingData.postcode}
                      onChange={(e) => handleBillingChange("postcode", e.target.value)}
                      placeholder="Enter postcode"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={billingData.phone}
                    onChange={(e) => handleBillingChange("phone", e.target.value)}
                    placeholder="Enter phone number (optional)"
                  />
                </div>

                <Button onClick={handleSaveBilling}>Save Billing Information</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

