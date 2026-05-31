import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { GraduationCap } from '@phosphor-icons/react'
import { useExam } from '@/lib/exams/ExamContext'
import { toast } from 'sonner'

/**
 * Header dropdown that lets the user switch between certification exams.
 * Available exams are selectable; "coming soon" exams are shown but disabled.
 */
export function ExamSwitcher() {
  const { exam, exams, setSelectedExamId } = useExam()

  const available = exams.filter((e) => e.available)
  const comingSoon = exams.filter((e) => !e.available)

  const handleChange = (id: string) => {
    const target = exams.find((e) => e.id === id)
    if (!target?.available) return
    setSelectedExamId(id)
    toast.success(`Switched to ${target.code}`, { description: target.fullName })
  }

  return (
    <Select value={exam.id} onValueChange={handleChange}>
      <SelectTrigger className="w-[200px] gap-2" aria-label="Select certification exam">
        <GraduationCap size={18} className="text-primary shrink-0" />
        <SelectValue placeholder="Select exam" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available</SelectLabel>
          {available.map((e) => (
            <SelectItem key={e.id} value={e.id}>
              <span className="font-medium">{e.code}</span>
              <span className="text-muted-foreground ml-2 text-xs">{e.fullName}</span>
            </SelectItem>
          ))}
        </SelectGroup>
        {comingSoon.length > 0 && (
          <SelectGroup>
            <SelectLabel>Coming soon</SelectLabel>
            {comingSoon.map((e) => (
              <SelectItem key={e.id} value={e.id} disabled>
                <span className="font-medium">{e.code}</span>
                <Badge variant="outline" className="ml-2 text-[10px]">Soon</Badge>
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  )
}
