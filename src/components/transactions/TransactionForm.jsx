import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
export const TransactionForm = ({ categories, onSubmit, initialData, onCancel }) => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            amount: initialData?.amount || 0,
            type: initialData?.type || 'expense',
            category: initialData?.category || '',
            date: initialData?.date || format(new Date(), 'yyyy-MM-dd'),
            description: initialData?.description || '',
        },
    });
    const selectedType = watch('type');
    const filteredCategories = categories.filter((c) => c.type === selectedType);
    return (<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={selectedType} onValueChange={(value) => {
            setValue('type', value);
            setValue('category', '');
        }}>
            <SelectTrigger>
              <SelectValue placeholder="Select type"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" type="number" step="0.01" min="0" {...register('amount', { required: true, min: 0.01, valueAsNumber: true })} placeholder="0.00"/>
          {errors.amount && <p className="text-sm text-destructive">Amount is required</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={watch('category')} onValueChange={(value) => setValue('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category"/>
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((category) => (<SelectItem key={category.id} value={category.name}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}/>
                  {category.name}
                </div>
              </SelectItem>))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" {...register('date', { required: true })}/>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea id="description" {...register('description')} placeholder="Add a note..." rows={2}/>
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (<Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>)}
        <Button type="submit">{initialData ? 'Update' : 'Add'} Transaction</Button>
      </div>
    </form>);
};
