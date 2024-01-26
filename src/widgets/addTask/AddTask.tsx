import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask } from 'api/tasks';
import { FormTask } from 'features/formTask/FormTask';
import { useRef } from 'react';
import { Button, Dialog } from 'shared/ui';

import styles from './AddTask.module.css';

export function AddTask() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();

  const { mutateAsync: addNewTask } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return (
    <section className={styles.addtask}>
      <Button
        className={styles.btn_addtask}
        onClick={() => dialogRef.current?.show()}
      >
        Add Task
      </Button>
      <Dialog className={styles.dialog} ref={dialogRef}>
        <FormTask
          btnConfirmText="Add"
          btnCancelText="Cancel"
          actionCancel={() => {
            dialogRef.current?.close();
            queryClient.cancelQueries({ queryKey: ['tasks'] });
          }}
          actionConfirm={async (text?: string, datetime?: string) => {
            if (datetime && text) {
              await addNewTask({ datetime, text });
            }
            dialogRef.current?.close();
          }}
        />
      </Dialog>
    </section>
  );
}
