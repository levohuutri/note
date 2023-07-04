import bpy
import logging

#log = logging.getLogger(__name__)

## Lấy danh sách các đối tượng đã chọn
#selected_objects = bpy.context.selected_objects
#print(selected_objects.__len__())

## Số lượng bộ sưu tập cần tạo
#num_collections = 8

## Tạo các bộ sưu tập
#collections = [bpy.data.collections.new(f"Collection {i}") for i in range(num_collections)]

## Chia các đối tượng vào các bộ sưu tập
#for i, obj in enumerate(selected_objects):
#    collection_index = i % num_collections
#    print(f'{i} {collection_index}')
#    collections[collection_index].objects.link(obj)
#    bpy.context.scene.collection.objects.unlink(obj)

## Thêm các bộ sưu tập vào cảnh hiện tại
#for collection in collections:
#    bpy.context.scene.collection.children.link(collection)

# Iterate through each collection in the scene
for idx, collection in enumerate(bpy.data.collections):
    # Set the collection as the only visible one
    bpy.context.view_layer.active_layer_collection = bpy.context.view_layer.layer_collection.children[idx]

    # Set the output path and filename for the GLB file
    output_path = 'D:/projects/os/BIM/GIT/gisbim/bimfront/app/data/'  # Replace with the desired output folder path
    output_filename = f'ST07-{idx}' + '.glb'  # Use the collection name as the filename

    # Export the collection as a GLB file
    bpy.ops.export_scene.gltf(
        filepath=output_path + output_filename,
        export_format='GLB',
        use_active_collection =True  # Export only the selected collection
    )
