"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, ProductSchema } from "~/model/product";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { BrainCircuit } from "lucide-react";

export const Home = () => {
  const form = useForm<Product>({
    resolver: zodResolver(ProductSchema),
  });

  const { getFieldState } = form;
  const productName = getFieldState("name");
  const productDescription = getFieldState("description");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(values: Product) {
    form.reset();
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Informsi Produk</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem className="mb-1">
                  <FormLabel>Nama Produk</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />

                  {productName.isDirty && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#a51a8f] absolute top-0 right-12"
                    >
                      <BrainCircuit color="#a51a8f" /> Tingkatkan dengan AI
                    </Button>
                  )}
                </FormItem>
              )}
            />

            <FormField
              name="description"
              render={({ field }) => (
                <FormItem className="mb-1">
                  <FormLabel>Deskirpsi</FormLabel>

                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>

                  <FormMessage />

                  {productDescription.isDirty && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#a51a8f] absolute top-0 right-12"
                    >
                      <BrainCircuit color="#a51a8f" /> Tingkatkan dengan AI
                    </Button>
                  )}
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
