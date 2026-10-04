import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";
import { Calendar, Users, Utensils, Clock, CheckCircle } from "lucide-react";

const cateringFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Phone number is required"),
  eventType: z.string().min(1, "Please select an event type"),
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().optional(),
  guestCount: z.string().min(1, "Please specify number of guests"),
  venue: z.string().optional(),
  selectedItems: z.array(z.string()).min(1, "Please select at least one item"),
  dietaryRequirements: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type CateringFormData = z.infer<typeof cateringFormSchema>;

const menuItems = [
  { id: "puff-puff", name: "Puff Puff", desc: "Sweet fried dough balls" },
  { id: "samosa", name: "Samosa", desc: "Spiced meat pastry triangles" },
  { id: "spring-rolls", name: "Spring Rolls", desc: "Crispy vegetable rolls" },
  { id: "meat-pie", name: "Meat Pies", desc: "Savory beef-filled pastries" },
  { id: "chin-chin", name: "Chin Chin", desc: "Crunchy sweet snacks" },
  { id: "gizzard", name: "Peppered Gizzard", desc: "Spicy chicken gizzards" },
  { id: "suya", name: "Suya Skewers", desc: "Grilled spiced beef" },
  { id: "plantain", name: "Fried Plantain", desc: "Sweet caramelized plantains" },
  { id: "small-chops-mix", name: "Small Chops Mix Platter", desc: "Assorted party favorites" },
  { id: "jollof-rice", name: "Jollof Rice (Bulk)", desc: "Party-style jollof" },
  { id: "fried-rice", name: "Fried Rice (Bulk)", desc: "Nigerian fried rice" },
  { id: "moi-moi", name: "Moi Moi", desc: "Steamed bean pudding" },
];

const eventTypes = ["Wedding", "Birthday Party", "Corporate Event", "Baby Shower", "Graduation Party", "Family Reunion", "Religious Celebration", "Funeral/Memorial", "Other"];
const guestRanges = ["10-25 guests", "26-50 guests", "51-100 guests", "101-200 guests", "200+ guests"];

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="street-label !text-black">{label}</label>
      {children}
      {error && <p className="text-secondary text-xs font-bold">{error}</p>}
    </div>
  );
}

export default function BookCatering() {
  const { toast } = useToast();

  const form = useForm<CateringFormData>({
    resolver: zodResolver(cateringFormSchema),
    defaultValues: {
      name: "", email: "", phone: "", eventType: "", eventDate: "",
      eventTime: "", guestCount: "", venue: "", selectedItems: [],
      dietaryRequirements: "", additionalNotes: "",
    },
  });

  const submitCatering = useMutation({
    mutationFn: async (data: CateringFormData) => {
      const messageContent = `
CATERING BOOKING REQUEST
========================
Contact: ${data.name} | ${data.email} | ${data.phone}
Event: ${data.eventType} on ${data.eventDate}${data.eventTime ? ` at ${data.eventTime}` : ""}
Guests: ${data.guestCount}
Venue: ${data.venue || "Not specified"}
Menu:
${data.selectedItems.map((item) => `- ${menuItems.find((m) => m.id === item)?.name || item}`).join("\n")}
Dietary: ${data.dietaryRequirements || "None specified"}
Notes: ${data.additionalNotes || "None"}
      `.trim();
      return apiRequest("POST", "/api/messages", {
        name: data.name,
        email: data.email,
        subject: `Catering Request: ${data.eventType} - ${data.eventDate}`,
        message: messageContent,
      });
    },
    onSuccess: () => {
      toast({ title: "Booking Request Sent!", description: "We'll contact you within 24 hours with a quote." });
      form.reset();
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const selectedItems = form.watch("selectedItems");
  const toggleItem = (itemId: string) => {
    const current = form.getValues("selectedItems");
    form.setValue("selectedItems", current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Marquee />

      {/* Header */}
      <div className="bg-secondary border-b-2 border-black">
        <div className="max-w-[1200px] mx-auto px-5 py-14 text-center">
          <span className="kicker !bg-black !text-primary mb-5">★ Let's Party ★</span>
          <h1 className="!text-black uppercase font-black text-[clamp(2.8rem,7vw,4.5rem)] leading-[0.95] mb-4">
            Book Catering
          </h1>
          <p className="text-xl text-black/80 max-w-2xl mx-auto font-medium">
            Tell us about your event. We'll bring the small chops — and the hype.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-14">
        <div className="brutal bg-[#f4f1ea] text-black p-6 md:p-10" style={{ boxShadow: "8px 8px 0 #0e0e0c" }}>
          <form onSubmit={form.handleSubmit((d) => submitCatering.mutate(d))} className="space-y-10">

            <div>
              <h2 className="!text-black font-display font-black uppercase text-2xl mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-secondary" /> Contact Information
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <Field label="Full Name *" error={form.formState.errors.name?.message}>
                  <input {...form.register("name")} placeholder="Your name" className="street-input" />
                </Field>
                <Field label="Email *" error={form.formState.errors.email?.message}>
                  <input {...form.register("email")} placeholder="your@email.com" className="street-input" />
                </Field>
                <Field label="Phone *" error={form.formState.errors.phone?.message}>
                  <input {...form.register("phone")} placeholder="+1 (555) 000-0000" className="street-input" />
                </Field>
              </div>
            </div>

            <div>
              <h2 className="!text-black font-display font-black uppercase text-2xl mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-secondary" /> Event Details
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Field label="Event Type *" error={form.formState.errors.eventType?.message}>
                  <select {...form.register("eventType")} className="street-input" defaultValue="">
                    <option value="" disabled>Select event</option>
                    {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Event Date *" error={form.formState.errors.eventDate?.message}>
                  <input type="date" {...form.register("eventDate")} className="street-input" />
                </Field>
                <Field label="Event Time">
                  <input type="time" {...form.register("eventTime")} className="street-input" />
                </Field>
                <Field label="Guests *" error={form.formState.errors.guestCount?.message}>
                  <select {...form.register("guestCount")} className="street-input" defaultValue="">
                    <option value="" disabled>Select range</option>
                    {guestRanges.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </Field>
              </div>
              <div className="mt-6">
                <Field label="Venue / Delivery Address">
                  <input {...form.register("venue")} placeholder="Where should we deliver?" className="street-input" />
                </Field>
              </div>
            </div>

            <div>
              <h2 className="!text-black font-display font-black uppercase text-2xl mb-2 flex items-center gap-2">
                <Utensils className="w-6 h-6 text-secondary" /> Select Menu Items *
              </h2>
              <p className="text-[#555] mb-6">Pick your lineup. We'll quote based on your selections.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => {
                  const active = selectedItems.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-4 border-2 cursor-pointer transition-all ${active ? "border-black bg-primary/30 shadow-[3px_3px_0_#000]" : "border-black/20 hover:border-black bg-white"}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 border-2 border-black flex items-center justify-center mt-0.5 shrink-0 ${active ? "bg-secondary text-white" : "bg-white"}`}>
                          {active && <CheckCircle className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <h4 className="!text-black font-display font-extrabold uppercase">{item.name}</h4>
                          <p className="text-sm text-[#555]">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {form.formState.errors.selectedItems && (
                <p className="text-secondary text-sm font-bold mt-2">{form.formState.errors.selectedItems.message}</p>
              )}
            </div>

            <div>
              <h2 className="!text-black font-display font-black uppercase text-2xl mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-secondary" /> Additional Information
              </h2>
              <div className="space-y-6">
                <Field label="Dietary Requirements / Allergies">
                  <textarea {...form.register("dietaryRequirements")} placeholder="e.g., Nut-free, Halal, Vegetarian options..." className="street-input min-h-[80px]" />
                </Field>
                <Field label="Additional Notes">
                  <textarea {...form.register("additionalNotes")} placeholder="Anything else we should know..." className="street-input min-h-[100px]" />
                </Field>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-black">
              <button
                type="submit"
                disabled={submitCatering.isPending}
                className="street-btn street-btn-orange w-full sm:w-auto min-w-[250px] disabled:opacity-60"
              >
                {submitCatering.isPending ? "Sending..." : "Request Quote"}
              </button>
              <p className="text-sm text-[#555] mt-4">
                We'll review your request and hit you back within 24 hours with a quote.
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
