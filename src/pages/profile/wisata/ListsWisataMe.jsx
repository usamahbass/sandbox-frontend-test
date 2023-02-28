import { useState } from "react";
import {
  Button,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
  ModalHeader,
} from "@chakra-ui/react";
import Table from "@app/components/Table";
import PageTitle from "@app/components/PageTitle";
import ProfileMeContainer from "@app/containers/ProfileContainer";
import InfoIcon from "@app/icons/InfoIcon";
import EditIcon from "@app/icons/EditIcon";
import DeleteIcon from "@app/icons/DeleteIcon";
import { request } from "@app/utils/request";
import { useStore } from "@app/hooks/useStore";
import { setTriggerTable } from "@app/context/actions";
import { useNavigate } from "react-router-dom";

const ListsWisataMe = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const toast = useToast();
  const navigate = useNavigate();
  const { dispatch } = useStore();

  const [wisataPick, setWisataPick] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteWisata = () => {
    setLoadingDelete(true);

    request
      .delete(`/api/tourist-object/tourist-object/${wisataPick?.slug}/`)
      .then(() => {
        toast({
          status: "success",
          title: "Sukses",
          description: `Wisata ${wisataPick?.name} berhasil dihapus !`,
        });

        setWisataPick(null);
        onClose();
        dispatch(setTriggerTable(true));
      })
      .finally(() => setLoadingDelete(false));
  };

  const columnsListsWisata = [
    {
      header: "Nama",
      accessorKey: "name",
    },
    {
      header: "Harga",
      accessorKey: "price",
    },
    {
      header: "Kategori",
      accessorKey: "category_data.label",
    },
    {
      header: "Aksi",
      accessorKey: "",
      cell: ({ row }) => (
        <Stack direction="row" spacing={2}>
          <IconButton
            onClick={() => navigate(`/wisata/${row?.original?.slug}`)}
            w="40px"
            h="40px"
            bg="white"
            borderRadius="50px"
          >
            <InfoIcon />
          </IconButton>

          <IconButton w="40px" h="40px" bg="white" borderRadius="50px">
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              onOpen();
              setWisataPick(row?.original);
            }}
            w="40px"
            h="40px"
            bg="white"
            borderRadius="50px"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <ProfileMeContainer>
      <PageTitle title="Wisata Saya" />

      <Table
        title="Wisata Saya"
        columns={columnsListsWisata}
        titleCreate="Tambah Wisata"
        placeholderSearch="Cari wisata"
        url="/api/tourist-object/tourist-object/me/"
        hrefCreate="/profil/wisata-saya/tambah-wisata"
      />

      <Modal
        size="lg"
        motionPreset="slideInBottom"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="1rem">
            Apakah anda yakin ingin menghapus wisata ini?
          </ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="primary"
              mr={3}
              onClick={onClose}
            >
              Batal
            </Button>
            <Button
              isLoading={loadingDelete}
              onClick={handleDeleteWisata}
              colorScheme="danger"
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ProfileMeContainer>
  );
};

export default ListsWisataMe;
