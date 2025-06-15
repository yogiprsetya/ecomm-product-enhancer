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
import { useGenAI } from "./useGenAI";
import { If } from "~/components/ui/if";
import { useCallback } from "react";

export const Home = () => {
  const gen = useGenAI();

  const form = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { getFieldState, getValues, setValue } = form;
  const productName = getFieldState("name");
  const productDescription = getFieldState("description");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(values: Product) {
    form.reset();
  }

  const setNameFromAI = useCallback(() => {
    gen.enhanceTitle({
      text: getValues("name"),
      callback: (res) => setValue("name", res),
    });
  }, [gen, getValues, setValue]);

  const setDescFromAI = useCallback(() => {
    gen.enhanceDesc({
      text: getValues("description"),
      callback: (res) => setValue("description", res),
    });
  }, [gen, getValues, setValue]);

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

                  <If condition={productName.isDirty}>
                    <div className="absolute top-0 right-12 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        className="text-[#a51a8f]"
                        onClick={setNameFromAI}
                      >
                        <BrainCircuit color="#a51a8f" /> Tingkatkan dengan AI
                      </Button>

                      <If condition={gen.titleEnhanced}>
                        <Button
                          variant="secondary"
                          size="sm"
                          type="button"
                          onClick={() => setValue("name", gen.titleEnhanced)}
                        >
                          Batal
                        </Button>
                      </If>
                    </div>
                  </If>
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

                  <If condition={productDescription.isDirty}>
                    <div className="absolute top-0 right-12 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        className="text-[#a51a8f]"
                        onClick={setDescFromAI}
                      >
                        <BrainCircuit color="#a51a8f" /> Tingkatkan dengan AI
                      </Button>

                      <If condition={gen.descEnhanced}>
                        <Button
                          variant="secondary"
                          size="sm"
                          type="button"
                          onClick={() => setValue("name", gen.descEnhanced)}
                        >
                          Batal
                        </Button>
                      </If>
                    </div>
                  </If>
                </FormItem>
              )}
            />

            <Button className="mt-6">Simpan Produk</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
