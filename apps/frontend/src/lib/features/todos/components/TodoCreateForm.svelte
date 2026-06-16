<script lang="ts">
  import { superForm, type SuperValidated } from "sveltekit-superforms";
  import { Alert, AlertDescription } from "$lib/components/ui/alert/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card/index.js";
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import {
    type TodoCreateFormData,
  } from "$lib/features/todos/schemas.js";

  type Props = {
    data: SuperValidated<TodoCreateFormData, string>;
  };

  const { data }: Props = $props();

  function getInitialFormData() {
    return data;
  }

  const todoForm = superForm(getInitialFormData(), {
    resetForm: true,
  });

  const { form: formData, enhance, errors, message, submitting } = todoForm;
</script>

<Card>
  <CardHeader>
    <CardTitle>Add a todo</CardTitle>
    <CardDescription>Create a todo for the authenticated user.</CardDescription>
  </CardHeader>

  <CardContent>
    <form method="POST" class="space-y-4" use:enhance>
      {#if $message}
        <Alert>
          <AlertDescription>{$message}</AlertDescription>
        </Alert>
      {/if}

      {#if $errors._errors?.length}
        <Alert variant="destructive">
          <AlertDescription>{$errors._errors[0]}</AlertDescription>
        </Alert>
      {/if}

      <Form.ElementField form={todoForm} name="title">
        {#snippet children({ constraints })}
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Title</Form.Label>
              <Input
                {...props}
                {...constraints}
                bind:value={$formData.title}
                placeholder="Learn SvelteKit actions"
              />
            {/snippet}
          </Form.Control>
          <Form.Description>Keep it short and actionable.</Form.Description>
          <Form.FieldErrors />
        {/snippet}
      </Form.ElementField>

      <Form.ElementField form={todoForm} name="completed">
        {#snippet children({ constraints })}
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Completed</Form.Label>
              <Checkbox
                type="checkbox"
                {...props}
                {...constraints}
              />
            {/snippet}
          </Form.Control>
          <Form.Description>Keep it short and actionable.</Form.Description>
          <Form.FieldErrors />
        {/snippet}
      </Form.ElementField>

      <Button type="submit" disabled={$submitting}>
        {$submitting ? "Adding..." : "Add todo"}
      </Button>
    </form>
  </CardContent>
</Card>
