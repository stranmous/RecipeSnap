import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Button } from "./ui/Button";
import { Colors } from "@/constants/colors";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView className="flex-1 bg-background justify-center px-6">
          <View className="items-center">
            <Text className="text-5xl mb-4">💥</Text>
            <Text className="text-error font-inter-semibold text-2xl mb-2 text-center">
              Oops! Something went wrong.
            </Text>
            <Text className="text-on-surface-variant font-inter-regular text-center mb-8">
              {this.state.error?.message || "An unexpected error occurred."}
            </Text>
            <Button title="Restart App" onPress={this.handleReset} />
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}
