import React from "react";
import {
  Animated,
  StyleSheet,
  Image,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../constants";
import onBoardings from "../mock";

const { COLORS, FONTS, SIZES } = theme;

const Onboarding = () => {
  const [completed, setCompleted] = React.useState(false);
  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeAllListeners();
  }, []);

  const renderContent = () => {
    return (
      <ScrollView
        horizontal
        scrollEnabled
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {onBoardings.map((item, index) => {
          return (
            <View key={index} style={{ width: SIZES.width }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={item.img}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: "10%",
                  left: 40,
                  right: 40,
                }}
              >
                <Text
                  style={{
                    ...FONTS.h1,
                    color: COLORS.gray,
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    ...FONTS.body3,
                    textAlign: "center",
                    marginTop: SIZES.base,
                    color: COLORS.gray,
                  }}
                >
                  {item.description}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  width: 150,
                  height: 60,
                  paddingLeft: 20,
                  justifyContent: "center",
                  borderTopLeftRadius: 30,
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                  backgroundColor: COLORS.blue,
                }}
                onPress={() => {
                  console.log("Button on pressed");
                }}
              >
                <Text style={{ ...FONTS.h1, color: COLORS.white }}>
                  {completed ? "Let's Go" : "Skip"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotsContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={[
                styles.dot,
                { width: dotSize, height: dotSize, opacity: opacity },
              ]}
            ></Animated.View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
      <View style={styles.dotsRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  imageAndTextContainer: {
    width: SIZES.width,
  },
  dotsRootContainer: {
    position: "absolute",
    bottom: SIZES.height > 700 ? "20%" : "16%",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding / 2,
    marginBottom: SIZES.padding * 3,
    height: SIZES.padding,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});
