import { Text } from 'react-native';
export const TextI = ({
  children,
  style,
}: {
  children: string[] | React.ReactNode;
  style?: object;
}) => {
  return <Text style={[style, { fontFamily: 'Inter' }]}>{children}</Text>;
};
