import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const ODS_DATA = [
  {
    color: '#E5243B',
    name: 'Erradicação da Pobreza',
    description:
      'Acabar com a pobreza em todas as suas formas e em todos os lugares.',
  },
  {
    color: '#DDA63A',
    name: 'Fome Zero',
    description:
      'Acabar com a fome, alcançar a segurança alimentar, melhorar a nutrição e promover a agricultura sustentável.',
  },
  {
    color: '#4C9F38',
    name: 'Saúde e Bem-Estar',
    description:
      'Garantir uma vida saudável e promover o bem-estar para todos, em todas as idades.',
  },
  {
    color: '#C5192D',
    name: 'Educação de Qualidade',
    description:
      'Assegurar que todos os jovens e adultos, homens e mulheres, alcancem a educação de qualidade.',
  },
  {
    color: '#FF3A21',
    name: 'Igualdade de Gênero',
    description:
      'Alcançar a igualdade de gênero e empoderar todas as mulheres e meninas.',
  },
  {
    color: '#26BDE2',
    name: 'Água Potável e Saneamento',
    description:
      'Garantir a disponibilidade e a gestão sustentável da água e do saneamento para todos.',
  },
  {
    color: '#FCC30B',
    name: 'Energia Limpa',
    description:
      'Assegurar o acesso de todos à energia barata, confiável, sustentável e moderna.',
  },
  {
    color: '#A21942',
    name: 'Trabalho Decente',
    description:
      'Promover o crescimento econômico sustentado, inclusivo e sustentável, o emprego pleno e produtivo e o trabalho decente para todos.',
  },
  {
    color: '#FD6925',
    name: 'Inovação e Infraestrutura',
    description:
      'Construir infraestruturas resilientes, promover a industrialização inclusiva e sustentável e fomentar a inovação.',
  },
  {
    color: '#DD1367',
    name: 'Redução das Desigualdades',
    description: 'Reduzir a desigualdade dentro dos países e entre eles.',
  },
  {
    color: '#FD9D24',
    name: 'Cidades Sustentáveis',
    description:
      'Tornar as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis.',
  },
  {
    color: '#BF8B2E',
    name: 'Consumo Responsável',
    description: 'Garantir padrões de consumo e produção sustentáveis.',
  },
  {
    color: '#3F7E44',
    name: 'Ação Climática',
    description:
      'Tomar medidas urgentes para combater a mudança climática e seus impactos.',
  },
  {
    color: '#0A97D9',
    name: 'Vida na Água',
    description:
      'Conservar e utilizar de forma sustentável os oceanos, os mares e os recursos marinhos.',
  },
  {
    color: '#56C02B',
    name: 'Vida Terrestre',
    description:
      'Proteger, restaurar e promover o uso sustentável dos ecossistemas terrestres.',
  },
  {
    color: '#00689D',
    name: 'Paz e Justiça',
    description:
      'Promover sociedades pacíficas e inclusivas para o desenvolvimento sustentável.',
  },
  {
    color: '#19486A',
    name: 'Parcerias',
    description:
      'Fortalecer os meios de implementação e revitalizar a parceria global para o desenvolvimento sustentável.',
  },
];

const generateArcPaths = (
  cx,
  cy,
  outerR,
  innerR,
  segments,
  start = 0,
  end = segments
) => {
  const paths = [];
  const angleStep = (2 * Math.PI) / segments;

  for (let i = start; i < end; i++) {
    const startAngle = i * angleStep;
    const endAngle = (i + 1) * angleStep;

    const x1 = cx + outerR * Math.cos(startAngle);
    const y1 = cy + outerR * Math.sin(startAngle);
    const x2 = cx + outerR * Math.cos(endAngle);
    const y2 = cy + outerR * Math.sin(endAngle);

    const x3 = cx + innerR * Math.cos(endAngle);
    const y3 = cy + innerR * Math.sin(endAngle);
    const x4 = cx + innerR * Math.cos(startAngle);
    const y4 = cy + innerR * Math.sin(startAngle);

    const pathData = `
      M ${x1} ${y1}
      A ${outerR} ${outerR} 0 0 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerR} ${innerR} 0 0 0 ${x4} ${y4}
      Z
    `;

    paths.push({ pathData, color: ODS_DATA[i].color });
  }
  return paths;
};

const ODSCircle = ({ size = 300 }) => {
  const outerRadius = size / 2;
  const innerRadius = outerRadius * 0.4;
  const paths = generateArcPaths(
    outerRadius,
    outerRadius,
    outerRadius - 10,
    innerRadius,
    17
  );
  const halfPaths = generateArcPaths(
    outerRadius,
    outerRadius,
    outerRadius - 10,
    innerRadius,
    17,
    0,
    9
  );

  const rotation = useSharedValue(0);
  const [selectedODS, setSelectedODS] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const navigation = useNavigation();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handlePress = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomRotations = Math.floor(Math.random() * 5) + 3;
    const angle = randomRotations * 360 + Math.floor(Math.random() * 360);

    rotation.value = withTiming(angle, { duration: 3000 }, () => {
      const segmentAngle = 360 / ODS_DATA.length;
      const index =
        Math.floor((angle % 360) / segmentAngle + 0.5) % ODS_DATA.length;
      runOnJS(setSelectedODS)(ODS_DATA[index]);
      runOnJS(setIsSpinning)(false);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.introSection}>
        <View style={styles.introTextContainer}>
          <Text style={styles.introTitle}>Bem-vindo ao app das ODS!</Text>
          <Text style={styles.introText}>
            Aqui, você pode explorar os 17 Objetivos de Desenvolvimento
            Sustentável de forma divertida e interativa.
          </Text>
        </View>
        <Svg width={150} height={150} viewBox={`0 0 ${size} ${size}`}>
          {halfPaths.map((arc, index) => (
            <Path
              key={index}
              d={arc.pathData}
              fill={arc.color}
              stroke="white"
              strokeWidth="2"
            />
          ))}
        </Svg>
      </View>

      <Text style={styles.title}>🌍 Descubra uma ODS!</Text>
      <Animated.View style={animatedStyle}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {paths.map((arc, index) => (
            <Path
              key={index}
              d={arc.pathData}
              fill={arc.color}
              stroke="white"
              strokeWidth="2"
            />
          ))}
        </Svg>
      </Animated.View>
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        iterationDelay={2500}>
        <TouchableOpacity
          onPress={handlePress}
          style={styles.button}
          disabled={isSpinning}>
          <Text style={styles.buttonText}>🎲 Sortear ODS</Text>
        </TouchableOpacity>
      </Animatable.View>
      {selectedODS && (
        <View
          style={[
            styles.resultContainer,
            { backgroundColor: selectedODS.color + '22' },
          ]}>
          <Text style={styles.resultTitle}>{selectedODS.name}</Text>
          <Text style={styles.descriptionText}>{selectedODS.description}</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => navigation.navigate('Jogos')}>
              <Text style={styles.playButtonText}>🎮 Jogar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setShowModal(true)}>
              <Text style={styles.secondaryButtonText}>📘 Saber mais</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedODS?.name}</Text>
            <Text style={styles.modalDescription}>
              {selectedODS?.description}
            </Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeModal}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.footerText}>
        ✨ Uma ODS por dia transforma o mundo!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fefefe',
    paddingHorizontal: 20,
  },
  introSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '100%',
  },
  introTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',

    marginBottom: 6,
  },
  introText: {
    fontSize: 14,
    color: '#444',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#009688',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00b4d9', //cor do botao sortear
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    borderRadius: 16,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  playButton: {
    backgroundColor: '#00b4d9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footerText: {
    marginTop: 40,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#444',
  },
  closeModal: {
    backgroundColor: '#00b4d9', //cor do botao fechar
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default ODSCircle;
