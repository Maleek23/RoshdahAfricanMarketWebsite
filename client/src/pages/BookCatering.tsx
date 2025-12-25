import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const eventTypes = [
  "Wedding",
  "Birthday Party",
  "Corporate Event",
  "Baby Shower",
  "Graduation Party",
  "Family Reunion",
  "Religious Celebration",
  "Funeral/Memorial",
  "Other",
];

const guestRanges = [
  "10-25 guests",
  "26-50 guests",
  "51-100 guests",
  "101-200 guests",
  "200+ guests",
];

export default function BookCatering() {
  const { toast } = useToast();
  
  const form = useForm<CateringFormData>({
    resolver: zodResolver(cateringFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      eventTime: "",
      guestCount: "",
      venue: "",
      selectedItems: [],
      dietaryRequirements: "",
      additionalNotes: "",
    },
  });

  const submitCatering = useMutation({
    mutationFn: async (data: CateringFormData) => {
      const messageContent = `
CATERING BOOKING REQUEST
========================

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}

Event Details:
- Event Type: ${data.eventType}
- Date: ${data.eventDate}
- Time: ${data.eventTime || "Not specified"}
- Number of Guests: ${data.guestCount}
- Venue: ${data.venue || "Not specified"}

Menu Items Selected:
${data.selectedItems.map(item => `- ${menuItems.find(m => m.id === item)?.name || item}`).join("\n")}

Dietary Requirements:
${data.dietaryRequirements || "None specified"}

Additional Notes:
${data.additionalNotes || "None"}
      `.trim();

      return apiRequest("POST", "/api/messages", {
        name: data.name,
        email: data.email,
        subject: `Catering Request: ${data.eventType} - ${data.eventDate}`,
        message: messageContent,
      });
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Sent!",
        description: "We'll contact you within 24 hours with a quote.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CateringFormData) => {
    submitCatering.mutate(data);
  };

  const selectedItems = form.watch("selectedItems");

  const toggleItem = (itemId: string) => {
    const current = form.getValues("selectedItems");
    if (current.includes(itemId)) {
      form.setValue("selectedItems", current.filter(id => id !== itemId));
    } else {
      form.setValue("selectedItems", [...current, itemId]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="relative pt-32 pb-16 bg-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Utensils className="w-8 h-8" />
          </div>
          <h1 className="font-display text-5xl font-bold mb-4">Book Catering</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Let us make your event unforgettable with authentic African small chops and dishes.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8">
        <Card className="p-8 shadow-2xl border-0">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            
            {/* Contact Information */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-secondary" />
                Contact Information
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name *</label>
                  <Input 
                    {...form.register("name")} 
                    placeholder="Your name" 
                    className="bg-muted/30"
                    data-testid="input-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input 
                    {...form.register("email")} 
                    placeholder="your@email.com" 
                    className="bg-muted/30"
                    data-testid="input-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number *</label>
                  <Input 
                    {...form.register("phone")} 
                    placeholder="+1 (555) 000-0000" 
                    className="bg-muted/30"
                    data-testid="input-phone"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-xs">{form.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-secondary" />
                Event Details
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Type *</label>
                  <Select onValueChange={(val) => form.setValue("eventType", val)}>
                    <SelectTrigger className="bg-muted/30" data-testid="select-event-type">
                      <SelectValue placeholder="Select event" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.eventType && (
                    <p className="text-red-500 text-xs">{form.formState.errors.eventType.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Date *</label>
                  <Input 
                    type="date" 
                    {...form.register("eventDate")} 
                    className="bg-muted/30"
                    data-testid="input-date"
                  />
                  {form.formState.errors.eventDate && (
                    <p className="text-red-500 text-xs">{form.formState.errors.eventDate.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Time</label>
                  <Input 
                    type="time" 
                    {...form.register("eventTime")} 
                    className="bg-muted/30"
                    data-testid="input-time"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Guests *</label>
                  <Select onValueChange={(val) => form.setValue("guestCount", val)}>
                    <SelectTrigger className="bg-muted/30" data-testid="select-guests">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      {guestRanges.map((range) => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.guestCount && (
                    <p className="text-red-500 text-xs">{form.formState.errors.guestCount.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <label className="text-sm font-medium">Venue/Delivery Address</label>
                <Input 
                  {...form.register("venue")} 
                  placeholder="Where should we deliver?" 
                  className="bg-muted/30"
                  data-testid="input-venue"
                />
              </div>
            </div>

            {/* Menu Selection */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-2 flex items-center gap-2">
                <Utensils className="w-6 h-6 text-secondary" />
                Select Menu Items *
              </h2>
              <p className="text-muted-foreground mb-6">Choose the items you'd like for your event. We'll provide a quote based on your selections.</p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedItems.includes(item.id)
                        ? "border-secondary bg-secondary/5"
                        : "border-border hover:border-secondary/50"
                    }`}
                    data-testid={`menu-item-${item.id}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 ${
                        selectedItems.includes(item.id) 
                          ? "bg-secondary border-secondary text-white" 
                          : "border-muted-foreground"
                      }`}>
                        {selectedItems.includes(item.id) && <CheckCircle className="w-3 h-3" />}
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {form.formState.errors.selectedItems && (
                <p className="text-red-500 text-sm mt-2">{form.formState.errors.selectedItems.message}</p>
              )}
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-secondary" />
                Additional Information
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Dietary Requirements / Allergies</label>
                  <Textarea 
                    {...form.register("dietaryRequirements")} 
                    placeholder="e.g., Nut-free, Halal, Vegetarian options needed..."
                    className="bg-muted/30 min-h-[80px]"
                    data-testid="input-dietary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Additional Notes or Special Requests</label>
                  <Textarea 
                    {...form.register("additionalNotes")} 
                    placeholder="Any other details we should know about your event..."
                    className="bg-muted/30 min-h-[100px]"
                    data-testid="input-notes"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-border">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full sm:w-auto min-w-[250px] bg-secondary hover:bg-secondary/90"
                disabled={submitCatering.isPending}
                data-testid="button-submit"
              >
                {submitCatering.isPending ? "Sending Request..." : "Request Quote"}
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                We'll review your request and contact you within 24 hours with a customized quote.
              </p>
            </div>
          </form>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
