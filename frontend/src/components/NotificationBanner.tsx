import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ApprovalRow } from "@/src/api";

const SEEN_KEY = "horizonte.notif.seen";

export function pickUnseenDecisions(approvals: ApprovalRow[], seen: Set<string>): ApprovalRow[] {
  return approvals.filter((a) => (a.status === "aprobado" || a.status === "rechazado") && !seen.has(a.approval_id));
}

export function NotificationBanner({ items, onDismiss, onOpen, colors, styles }: any) {
  if (!items || items.length === 0) return null;
  const item: ApprovalRow = items[0];
  const isApproved = item.status === "aprobado";
  const label = isApproved ? "Aprobado" : "Rechazado con observaciones";
  const bg = isApproved ? colors.success : colors.error;
  return (
    <Pressable testID={`notif-banner-${item.approval_id}`} onPress={() => onOpen(item)} style={[bannerStyles.wrap, { backgroundColor: bg }]}>
      <MaterialCommunityIcons name={isApproved ? "check-decagram" : "alert-circle-outline"} size={22} color={colors.onBrandPrimary} />
      <View style={{ flex: 1 }}>
        <Text style={[bannerStyles.title, { color: colors.onBrandPrimary }]}>{label}</Text>
        <Text style={[bannerStyles.body, { color: colors.onBrandPrimary }]} numberOfLines={2}>
          {item.kind === "patria" ? `Punto ${parseInt(item.ref_id, 10) + 1} · ` : item.kind === "progression" ? "Progresión · " : "Campamento · "}
          {item.text || item.place || ""}
          {item.review_note ? ` · Nota: ${item.review_note}` : ""}
        </Text>
        {items.length > 1 && <Text style={[bannerStyles.more, { color: colors.onBrandPrimary }]}>+{items.length - 1} más</Text>}
      </View>
      <Pressable testID="notif-dismiss" onPress={() => onDismiss(item.approval_id)} hitSlop={12}>
        <MaterialCommunityIcons name="close" size={18} color={colors.onBrandPrimary} />
      </Pressable>
    </Pressable>
  );
}

export function Toast({ visible, message, tone, colors }: { visible: boolean; message: string; tone: "success" | "error"; colors: any }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.delay(2600),
        Animated.timing(anim, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, anim]);

  if (!visible) return null;
  const bg = tone === "success" ? colors.success : colors.error;
  return (
    <Animated.View pointerEvents="none" style={{
      position: "absolute", top: 24, left: 20, right: 20,
      backgroundColor: bg, borderRadius: 14, padding: 12,
      opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }],
      shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 8, elevation: 6,
    }}>
      <Text style={{ color: colors.onBrandPrimary, fontWeight: "800", fontSize: 13 }}>{message}</Text>
    </Animated.View>
  );
}

const bannerStyles = {
  wrap: { flexDirection: "row" as const, gap: 12, borderRadius: 16, padding: 14, marginTop: 14, alignItems: "center" as const },
  title: { fontSize: 12, fontWeight: "800" as const, letterSpacing: 1 },
  body: { fontSize: 13, marginTop: 3 },
  more: { fontSize: 11, marginTop: 4, opacity: 0.8 },
};

export const NOTIF_SEEN_KEY = SEEN_KEY;

export function useUnseenApprovals(approvals: ApprovalRow[], seenIds: string[]) {
  const seenSet = useMemo(() => new Set(seenIds), [seenIds]);
  return useMemo(() => pickUnseenDecisions(approvals, seenSet), [approvals, seenSet]);
}
