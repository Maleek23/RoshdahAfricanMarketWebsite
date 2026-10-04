import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useSendMessage } from "@/hooks/use-content";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const sendMessage = useSendMessage();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = (data: InsertMessage) => {
    sendMessage.mutate(data, {
      onSuccess: () => {
        toast({ title: "Message Sent!", description: "We'll get back to you ASAP." });
        form.reset();
      },
      onError: (error) => {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      },
    });
  };

  const info = [
    { icon: <MapPin className="w-5 h-5" />, title: "Visit Us", text: "123 Market Street, Food District, NY 10001" },
    { icon: <Phone className="w-5 h-5" />, title: "Call Us", text: "+1 (555) 123-4567" },
    { icon: <Mail className="w-5 h-5" />, title: "Email Us", text: "hello@roshdahmarket.com" },
    { icon: <Clock className="w-5 h-5" />, title: "Hours", text: "Mon–Sat: 9AM–8PM, Sun: 10AM–6PM" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Marquee />

      <div className="border-b-2 border-primary">
        <div className="max-w-[1200px] mx-auto px-5 pt-14 pb-12 text-center">
          <span className="kicker mb-5">★ Holler At Us ★</span>
          <h1 className="uppercase font-black text-[clamp(2.8rem,7vw,4.5rem)] leading-[0.95] mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-[#d8d4c9] max-w-2xl mx-auto text-lg">
            Questions about an order, catering, or shipping? We got you.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-14">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="brutal bg-[#f4f1ea] text-black p-6">
              <h3 className="!text-black font-display font-black uppercase text-xl mb-6">Contact Info</h3>
              <div className="space-y-5">
                {info.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 border-2 border-black bg-primary flex items-center justify-center text-black shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="!text-black font-display font-extrabold uppercase text-sm">{item.title}</h4>
                      <p className="text-[#555] text-sm mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="brutal overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.183952994975!2d-73.9877312845941!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Map"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="brutal bg-[#f4f1ea] text-black p-6 md:p-8" style={{ boxShadow: "8px 8px 0 #0e0e0c" }}>
              <h2 className="!text-black font-display font-black uppercase text-2xl mb-6">Send us a Message</h2>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="street-label !text-black">Your Name</label>
                    <input {...form.register("name")} placeholder="John Doe" className="street-input" />
                    {form.formState.errors.name && <p className="text-secondary text-xs font-bold">{form.formState.errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="street-label !text-black">Email Address</label>
                    <input {...form.register("email")} placeholder="john@example.com" className="street-input" />
                    {form.formState.errors.email && <p className="text-secondary text-xs font-bold">{form.formState.errors.email.message}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="street-label !text-black">Subject</label>
                  <input {...form.register("subject")} placeholder="What's this about?" className="street-input" />
                </div>
                <div className="space-y-2">
                  <label className="street-label !text-black">Message</label>
                  <textarea {...form.register("message")} placeholder="How can we help?" className="street-input min-h-[150px]" />
                  {form.formState.errors.message && <p className="text-secondary text-xs font-bold">{form.formState.errors.message.message}</p>}
                </div>
                <button type="submit" disabled={sendMessage.isPending} className="street-btn street-btn-lime w-full sm:w-auto min-w-[200px] disabled:opacity-60">
                  {sendMessage.isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
