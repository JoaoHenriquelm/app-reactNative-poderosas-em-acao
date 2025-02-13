import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Associate/[AssociateCpf]"
        options={{
          headerTitle: 'Ficha',
          presentation: 'modal',
          headerShown: true,
          headerTitleStyle: { fontFamily: 'Inter' },
        }}
      />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
