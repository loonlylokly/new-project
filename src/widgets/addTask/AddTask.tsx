import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask } from 'api/tasks';
import { FormTask } from 'features/formTask/FormTask';
import { useRef } from 'react';
import { Button, Dialog } from 'shared/ui';
import { TFormTask } from 'types/task';

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
        onClick={() => dialogRef.current?.showModal()}
      >
        Add Task
      </Button>
      <Dialog className={styles.dialog} ref={dialogRef}>
        <FormTask
          taskCurrent={{ datetime: '', text: '' }}
          btnConfirmText="Add"
          btnCancelText="Cancel"
          actionCancel={() => {
            dialogRef.current?.close();
          }}
          actionConfirm={async (newTask?: TFormTask) => {
            if (newTask) {
              await addNewTask(newTask);
            }
            dialogRef.current?.close();
          }}
        />
      </Dialog>
    </section>
  );
}
