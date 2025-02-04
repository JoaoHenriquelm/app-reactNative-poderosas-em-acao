import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#c50b31', headerShown: false }}>
      <Tabs.Screen
        name="Associates"
        options={{
          href: {
            pathname: '/Associates',
          },
          title: 'Associados',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Birthdays"
        options={{
          href: {
            pathname: '/Birthdays',
          },
          title: 'Aniversariantes',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="birthday-cake" color={color} />,
        }}
      />
    </Tabs>
  );
}
