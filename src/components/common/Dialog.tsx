import { t } from '@lingui/core/macro'
import React from 'react'

import { Button } from '@/components/ui/button'
import * as DialogPrimitive from '@/components/ui/dialog'
import { cn } from '@/libs/utils'

interface CommonDialogProps extends React.ComponentProps<
  typeof DialogPrimitive.Dialog
> {
  trigger?: React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogTrigger>
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  confirmText?: React.ReactNode
  cancelText?: React.ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  showCancel?: boolean
  showConfirm?: boolean
  closeOnConfirm?: boolean
  showCloseButton?: boolean
  contentClassName?: string
  headerClassName?: string
  footerClassName?: string
  disableConfirm?: boolean
}

const Dialog: React.FC<CommonDialogProps> = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  confirmText = t`Confirm`,
  cancelText = t`Cancel`,
  onConfirm,
  onCancel,
  showCancel = false,
  showConfirm,
  closeOnConfirm = true,
  showCloseButton = false,
  contentClassName,
  headerClassName,
  footerClassName,
  disableConfirm = false
}) => {
  const shouldShowConfirm = showConfirm ?? Boolean(onConfirm)

  const confirmButton = shouldShowConfirm ? (
    closeOnConfirm ? (
      <DialogPrimitive.DialogClose asChild>
        <Button type="button" onClick={onConfirm} disabled={disableConfirm}>
          {confirmText}
        </Button>
      </DialogPrimitive.DialogClose>
    ) : (
      <Button type="button" onClick={onConfirm} disabled={disableConfirm}>
        {confirmText}
      </Button>
    )
  ) : null

  const cancelButton = showCancel ? (
    <DialogPrimitive.DialogClose asChild>
      <Button type="button" variant="outline" onClick={onCancel}>
        {cancelText}
      </Button>
    </DialogPrimitive.DialogClose>
  ) : null

  return (
    <DialogPrimitive.Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogPrimitive.DialogTrigger {...trigger} /> : null}
      <DialogPrimitive.DialogContent
        showCloseButton={showCloseButton}
        className={cn('p-0', contentClassName)}
      >
        {title || description ? (
          <DialogPrimitive.DialogHeader className={cn('p-4', headerClassName)}>
            {title ? (
              <DialogPrimitive.DialogTitle className="text-left">
                {title}
              </DialogPrimitive.DialogTitle>
            ) : null}
            {description ? (
              <DialogPrimitive.DialogDescription>
                {description}
              </DialogPrimitive.DialogDescription>
            ) : null}
          </DialogPrimitive.DialogHeader>
        ) : null}
        <section className={cn('p-4', title || description ? 'pt-0' : 'pt-12')}>
          {children}
        </section>
        {footer ? (
          <DialogPrimitive.DialogFooter className={footerClassName}>
            {footer}
          </DialogPrimitive.DialogFooter>
        ) : shouldShowConfirm || showCancel ? (
          <DialogPrimitive.DialogFooter className={footerClassName}>
            {cancelButton}
            {confirmButton}
          </DialogPrimitive.DialogFooter>
        ) : null}
      </DialogPrimitive.DialogContent>
    </DialogPrimitive.Dialog>
  )
}

export type { CommonDialogProps }
export { Dialog }
export default Dialog
