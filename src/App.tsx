import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import {
  HomePage,
  AccountsPage,
  OrderPage,
  WarmupPage,
  EmulatorPage,
  FAQPage,
  ConfigPage,
  PaymentPage,
  ChatPage,
  AdminPage,
} from "@/pages/tabs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="warmup" element={<WarmupPage />} />
            <Route path="emulator" element={<EmulatorPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="config" element={<ConfigPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
