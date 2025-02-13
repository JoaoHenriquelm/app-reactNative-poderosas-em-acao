import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 50,
        },
        tabBarActiveTintColor: '#f64f71',
        headerShown: false,
        tabBarLabelStyle: { fontFamily: 'Inter' },
      }}>
      <Tabs.Screen
        name="Associates"
        options={{
          href: {
            pathname: '/Associates',
          },
          tabBarLabelStyle: { fontFamily: 'Inter' },
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
          tabBarLabelStyle: { fontFamily: 'Inter' },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="birthday-cake" color={color} />,
        }}
      />
    </Tabs>
  );
}
