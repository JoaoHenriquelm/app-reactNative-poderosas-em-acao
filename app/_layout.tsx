import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Associate/[AssociateCpf]"
        options={{ headerTitle: 'Associado', presentation: 'modal', headerShown: true }}
      />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
